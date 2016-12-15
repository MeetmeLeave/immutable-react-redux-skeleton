import rootReducer from './rootReducer';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import socketRootSaga, {InitActionType} from './sagas/socketSaga';

export default function initStore(isInDevMode, DevTools) {
    const sagaMiddleware = createSagaMiddleware();

    const store = isInDevMode ?

        createStore(
            rootReducer,
            DevTools.instrument(),
            applyMiddleware(sagaMiddleware)
        ) :

        createStore(
            rootReducer,
            applyMiddleware(sagaMiddleware)
        );

    sagaMiddleware.run(socketRootSaga);
    store.dispatch({ type: InitActionType });

    return store;
}