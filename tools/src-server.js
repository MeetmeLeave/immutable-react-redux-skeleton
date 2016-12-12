import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import Server from 'socket.io';

import * as actions from '../src/units/actionTypes';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});

let counter = 2;

const units = [
    { id: 0, title: 'Unit 0' },
    { id: 1, title: 'Unit 1' },
    { id: 2, title: 'Unit 2' }
];

const io = new Server().attach(8090);

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('load', () => {
        console.log('load');
        socket.emit(actions.LOADED, units);
        socket.on(actions.ADD, (unit) => {
            console.log('ADD: ' + JSON.stringify(unit));
            counter += 1;
            unit.id = counter;
            units.push(unit);
            socket.emit(actions.ADDED, unit);
        });
        socket.on(actions.EDIT, (unit) => {
            console.log('EDIT: ' + JSON.stringify(unit));
            units[+unit.id] = unit;
            socket.emit(actions.EDITED, unit);
        });
        socket.on(actions.DELETE, (id) => {
            console.log('DELETE: ' + JSON.stringify(id));
            units.splice(id, 1);
            socket.emit(actions.DELETED, id);
        });
    });
});
