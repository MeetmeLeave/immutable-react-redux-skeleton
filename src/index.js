/* eslint-disable import/default */
import 'babel-polyfill';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import initStore from './store';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const isInDevMode = process.env.NODE_ENV !== 'production';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const store = initStore(isInDevMode, DevTools);

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