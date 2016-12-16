import path from 'path';
import fileExists from 'file-exists';
import fs from 'fs';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';

import rootReducer from '../../rootReducer';

import { Differ, DEVICE_SIZES } from 'react-cornea';

import { UnitsListPage } from './UnitsListPage';
import * as actionTypes from '../actionTypes';

const componentName = 'UnitsListPage';

describe('UnitsListPage', () => {
    it('render base UnitsListPage', (done) => {
        const store = createStore(
            rootReducer
        );

        const units = [
            { id: 0, tittle: '0' }
        ];

        var differ = new Differ({
            component: <UnitsListPage units={units} />,
            componentName,
            savePath: './__tests__/' + componentName + '/__screenshots__/',
            onSnapshotCreated: done
        });

        differ.compare().then(e => {
            if (e) {
                done();
            }
            else {
                done.fail('Images do not match!');
            }
        });

    }, 5000);
});