import React from 'react';
import fs from 'fs';
import { Differ } from 'react-cornea';

import HomePage from './HomePage';

const componentName = 'HomePage';

describe('HomePage', () => {
    const css = fs.readFileSync('./src/home/components/HomePage.css').toString();
    it('render base HomePage', (done) => {
        var differ = new Differ({
            component: <HomePage />,
            componentName,
            savePath: '__tests__\\' + componentName + '\\',
            onSnapshotCreated: done,
            css
        });

        differ.compare().then(e => {
            if (e) {
                done();
            }
            else {
                done.fail('Images do not match!');
            }
        }).catch(e => {
            done.fail(e);
        });

    }, 5000);
});