import fs from 'fs';
import React from 'react';
import { Differ } from 'react-cornea';

import { UnitsListPage } from './UnitsListPage';
import * as actionTypes from '../actionTypes';

const componentName = 'UnitsListPage';

describe('UnitsListPage', () => {
    it('render base UnitsListPage', (done) => {
        const units = [
            { id: 0, tittle: '0' }
        ];

        const differ = new Differ({
            component: <UnitsListPage units={units} />,
            componentName,
            savePath: '__tests__\\' + componentName + '\\',
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