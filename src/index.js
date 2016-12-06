/* eslint-disable import/default */
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import io from 'socket.io-client';
import getClientId from './common/clientId';
import { setClientId, setState, setConnectionState } from './socket/actions';
import * as unitActions from './units/actions';
import remoteActionMiddleware from './socket/remoteActionMiddleware';

const isInDevMode = process.env.NODE_ENV !== 'production';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', units =>
    store.dispatch(setState(units))
);
socket.on('units/ADDED', units =>
    store.dispatch(unitActions.added(units))
);
socket.on('units/EDITED', units =>
    store.dispatch(unitActions.updated(units))
);
socket.on('units/DELETED', units =>
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
    socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
    );

const store = isInDevMode ?

    createStore(
        rootReducer,
        DevTools.instrument(),
        applyMiddleware(remoteActionMiddleware(socket))
    ) :

    createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

store.dispatch(setClientId(getClientId()));

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: function (state) {
        return state.get('routing').toObject();
    }
});

render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes} />
            {isInDevMode && <DevTools />}
        </div>
    </Provider>,
    document.getElementById('app')
);