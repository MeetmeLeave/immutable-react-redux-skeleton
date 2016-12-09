import * as actions from './actions';
import * as constants from './constants';
import * as unitActionTypes from '../units/actionTypes';
import * as unitActions from '../units/actions';
import remoteActionMiddleware from './remoteActionMiddleware';
import reducer from './reducer';

import io from 'socket.io-client';

const socketWrapper = function () {
    return io(`${location.protocol}//${location.hostname}:8090`);
};

const socketSubscribe = function (socket, store) {
    socket.on('state', units =>
        store.dispatch(actions.setState(units))
    );
    socket.on(unitActionTypes.ADDED, units =>
        store.dispatch(unitActions.added(units))
    );
    socket.on(unitActionTypes.EDITED, units =>
        store.dispatch(unitActions.updated(units))
    );
    socket.on(unitActionTypes.DELETED, units =>
        store.dispatch(unitActions.deleted(units))
    );
    [
        'connect',
        'connect_error',
        'connect_timeout',
        'reconnect',
        'reconnecting',
        'reconnect_error',
        'reconnect_failed'
    ].forEach(ev =>
        socket.on(ev, () => store.dispatch(actions.setConnectionState(ev, socket.connected)))
        );
};

export default { actions, constants, reducer, socketWrapper, socketSubscribe, remoteActionMiddleware };