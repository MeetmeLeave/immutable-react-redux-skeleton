import { eventChannel } from 'redux-saga';
import { put, take, call, fork } from 'redux-saga/effects';

import * as unitActionTypes from '../units/actionTypes';
import * as unitActions from '../units/actions';

/* eslint-disable no-constant-condition */

export const InitActionType = 'CONNECT';

function connect() {
    const socket = new WebSocket('ws://localhost:8090');
    return new Promise(resolve => {
        socket.addEventListener('open', () => {
            resolve(socket);
        });
    });
}

function* subscribeToSocketEventChannel(socket) {
    return eventChannel(emitter => {
        socket.send(`{"type" : "load"}`);
        socket.addEventListener('message', message => {
            const object = JSON.parse(message.data);
            switch (object.type) {
                case unitActionTypes.LOADED:
                    emitter(unitActions.loaded(object.units));
                    break;
                case unitActionTypes.ADDED:
                    emitter(unitActions.added(object.unit));
                    break;
                case unitActionTypes.EDITED:
                    emitter(unitActions.updated(object.unit));
                    break;
                case unitActionTypes.DELETED:
                    emitter(unitActions.deleted(object.id));
                    break;
            }
        });

        return () => { };
    });
}

function* handleInput(socket) {
    while (true) {
        const action = yield take(
            [
                unitActionTypes.ADD,
                unitActionTypes.EDIT,
                unitActionTypes.DELETE
            ]
        );
        socket.send(JSON.stringify(action));
    }
}

function* handleOutput(socket) {
    const socketEventChannel = yield call(subscribeToSocketEventChannel, socket);
    while (true) {
        const message = yield take(socketEventChannel);
        yield put(message);
    }
}

function* handleSocket(socket) {
    yield fork(handleOutput, socket);
    yield fork(handleInput, socket);
}

export default function* socketRootSaga() {
    while (true) {
        const connectEvent = yield take(InitActionType);
        const socket = yield call(connect);
        const task = yield fork(handleSocket, socket);
    }
}