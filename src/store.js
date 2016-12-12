import rootReducer from './rootReducer';

import { createStore, applyMiddleware } from 'redux';
// import getClientId from './common/clientId';
// import socketWrapper from './socket';
import createSagaMiddleware from 'redux-saga';
import socketSaga from './sagas/socketSaga';

export default function initStore(isInDevMode, DevTools) {
    // const socket = socketWrapper.socketWrapper();

    const sagaMiddleware = createSagaMiddleware();

    const store = isInDevMode ?

        createStore(
            rootReducer,
            DevTools.instrument(),
            applyMiddleware(/*socketWrapper.remoteActionMiddleware(socket),*/ sagaMiddleware)
        ) :

        createStore(
            rootReducer,
            applyMiddleware(/*socketWrapper.remoteActionMiddleware(socket),*/ sagaMiddleware)
        );

    sagaMiddleware.run(socketSaga);
    // socketWrapper.socketSubscribe(socket, store);
    store.dispatch({ type: 'CONNECT' });

    return store;
}