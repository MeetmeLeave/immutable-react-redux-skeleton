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
    { id: '0', title: 'Unit 0' },
    { id: '1', title: 'Unit 1' },
    { id: '2', title: 'Unit 2' }
];

const io = new Server().attach(8090);

io.on('connection', (socket) => {
    socket.emit('state', units);
    socket.on(actions.ADD, (action) => {
        console.log('ADD: ' + action);
        counter += 1;
        action.unit.id = counter;
        units.push(action.unit);
        socket.emit(actions.ADDED, action.unit);
    });
    socket.on(actions.EDIT, (action) => {
        console.log('EDIT: ' + action);
        units[+action.unit.id] = action.unit;
        socket.emit(actions.EDITED, action.unit);
    });
    socket.on(actions.DELETE, (action) => {
        console.log('DELETE: ' + action);
        units.splice(action.id, 1);
        socket.emit(actions.DELETED, action.id);
    });
});
