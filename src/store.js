import rootReducer from './rootReducer';

import { createStore, applyMiddleware } from 'redux';
import getClientId from './common/clientId';
import socketWrapper from './socket';

export default function initStore(isInDevMode, DevTools) {
    const socket = socketWrapper.socketWrapper();

    const store = isInDevMode ?

        createStore(
            rootReducer,
            DevTools.instrument(),
            applyMiddleware(socketWrapper.remoteActionMiddleware(socket))
        ) :

        createStore(
            rootReducer,
            applyMiddleware(socketWrapper.remoteActionMiddleware(socket))
        );

    socketWrapper.socketSubscribe(socket, store);
    store.dispatch(socketWrapper.actions.setClientId(getClientId()));

    return store;
}