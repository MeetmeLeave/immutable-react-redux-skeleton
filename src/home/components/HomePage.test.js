import path from 'path';
import React from 'react';
import { Differ } from 'react-cornea';

import HomePage from './HomePage';

const componentName = 'HomePage';

describe('HomePage', () => {
    it('render base HomePage', (done) => {
        var differ = new Differ({
            component: <HomePage />,
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