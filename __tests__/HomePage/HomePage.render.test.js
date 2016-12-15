import path from 'path';
import fs from 'fs';
import React from 'react';
import { Differ } from 'react-cornea';

import HomePage from '../../src/home/components/HomePage';

const yourFilePath = path.join(__dirname, '__screenshots__', '/');
const componentName = 'HomePage';

describe('HomePage', () => {
    const css = fs.readFileSync('./src/home/components/HomePage.css').toString();
    it('render base HomePage', (done) => {
        var differ = new Differ({
            component: <HomePage />,
            componentName,
            savePath: yourFilePath,
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
        });

    }, 5000);
});