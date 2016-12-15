import React from 'react';
import renderer from 'react-test-renderer';
import UnitsListPage from '../../src/units/components/UnitsListPage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import rootReducer from '../../src/rootReducer';

import * as actionTypes from '../../src/units/actionTypes';

describe('test', () => {
    it('renders as an anchor when no page is set', () => {
        const store = createStore(
            rootReducer
        );

        var tree = renderer.create(
            <Provider store={store}>
                <UnitsListPage />
            </Provider>
        );

        expect(tree).toMatchSnapshot();
    });
});