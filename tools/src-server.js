import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

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

const WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8090 });

wss.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (e) => {
        console.log(e);
        const action = JSON.parse(e);
        let reply = {};

        switch (action.type) {
            case 'load':
                reply.type = actions.LOADED;
                reply.units = units;
                socket.send(JSON.stringify(reply));
                break;
            case actions.ADD:
                let unitToAdd = action.unit;
                counter += 1;
                unitToAdd.id = counter;
                units.push(unitToAdd);
                reply.type = actions.ADDED;
                reply.unit = unitToAdd;
                socket.send(JSON.stringify(reply));
                break;
            case actions.EDIT:
                let unitToEdit = action.unit;
                units[+unitToEdit.id] = unitToEdit;
                reply.type = actions.EDITED;
                reply.unit = unitToEdit;
                socket.send(JSON.stringify(reply));
                break;
            case actions.DELETE:
                let id = action.id;
                units.splice(id, 1);
                reply.type = actions.DELETED;
                reply.id = id;
                socket.send(JSON.stringify(reply));
                break;
        }
    });
});