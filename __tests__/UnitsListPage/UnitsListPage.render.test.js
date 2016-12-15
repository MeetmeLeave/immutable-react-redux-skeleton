import path from 'path';
import fileExists from 'file-exists';
import fs from 'fs';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';

import rootReducer from '../../src/rootReducer';

import { Differ, DEVICE_SIZES } from 'react-cornea';

import { UnitsListPage } from '../../src/units/components/UnitsListPage';
import * as actionTypes from '../../src/units/actionTypes';

const yourFilePath = path.join(__dirname, '__screenshots__', '/');
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
            savePath: yourFilePath,
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