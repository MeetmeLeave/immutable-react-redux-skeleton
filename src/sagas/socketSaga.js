import { eventChannel } from 'redux-saga';
import { put, take, call, fork } from 'redux-saga/effects';
import io from 'socket.io-client';

import * as unitActionTypes from '../units/actionTypes';
import * as unitActions from '../units/actions';

/* eslint-disable no-constant-condition */

export const InitActionType = 'CONNECT';

function connect() {
    const socket = io(`${location.protocol}//${location.hostname}:8090`);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function* subscribeToSocketEventChannel(socket) {
    return eventChannel(emitter => {
        socket.emit('load');
        socket.on(unitActionTypes.LOADED, units => {
            emitter(unitActions.loaded(units));
        });
        socket.on(unitActionTypes.ADDED, unit => {
            emitter(unitActions.added(unit));
        });
        socket.on(unitActionTypes.EDITED, unit => {
            emitter(unitActions.updated(unit));
        });
        socket.on(unitActionTypes.DELETED, id => {
            emitter(unitActions.deleted(id));
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

        switch (action.type) {
            case unitActionTypes.ADD:
                socket.emit(unitActionTypes.ADD, action.unit);
                break;
            case unitActionTypes.EDIT:
                socket.emit(unitActionTypes.EDIT, action.unit);
                break;
            case unitActionTypes.DELETE:
                socket.emit(unitActionTypes.DELETE, action.id);
                break;
        }
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