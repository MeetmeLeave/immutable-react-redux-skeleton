import { eventChannel } from 'redux-saga';
import { put, take, call, fork } from 'redux-saga/effects';
import io from 'socket.io-client';

import * as unitActionTypes from '../units/actionTypes';
import * as unitActions from '../units/actions';

/* eslint-disable no-constant-condition */

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
        console.log('load');
        socket.on(unitActionTypes.LOADED, units => {
            console.log('loaded');
            emitter(unitActions.loaded(units));
        });
        socket.on(unitActionTypes.ADDED, units => {
            console.log('added');
            emitter(unitActions.added(units));
        });
        socket.on(unitActionTypes.EDITED, units => {
            console.log('edited');
            emitter(unitActions.updated(units));
        });
        socket.on(unitActionTypes.DELETED, units => {
            console.log('deleted');
            emitter(unitActions.deleted(units));
        });
        return () => { };
    });
}

function* handleInput(socket) {
    while (true) {
        const action = yield take([unitActionTypes.ADD, unitActionTypes.EDIT, unitActionTypes.DELETE]);
        console.log(action);
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

export default function* socket() {
    console.log('started');
    while (true) {
        const connectEvent = yield take('CONNECT');
        console.log('connected');
        const socket = yield call(connect);
        console.log(socket);
        const task = yield fork(handleSocket, socket);
    }
}

