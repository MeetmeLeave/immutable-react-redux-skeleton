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
    { id: 0, title: 'Unit 0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' },
    { id: 1, title: 'Unit 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' },
    { id: 2, title: 'Unit 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' }
];

const WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8090 });

wss.on('connection', (socket) => {
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
                socket.send(JSON.stringify(handleAdd(action, reply)));
                break;
            case actions.EDIT:
                socket.send(JSON.stringify(handleEdit(action, reply)));
                break;
            case actions.DELETE:
                socket.send(JSON.stringify(handleDelete(action, reply)));
                break;
        }
    });
});

function handleAdd(action, reply) {
    let unitToAdd = action.unit;
    counter += 1;
    unitToAdd.id = counter;
    units.push(unitToAdd);
    reply.type = actions.ADDED;
    reply.unit = unitToAdd;
    return reply;
}


function handleEdit(action, reply) {
    let unitToEdit = action.unit;
    units[+unitToEdit.id] = unitToEdit;
    reply.type = actions.EDITED;
    reply.unit = unitToEdit;
    return reply;
}

function handleDelete(action, reply) {
    let id = action.id;
    units.splice(id, 1);
    reply.type = actions.DELETED;
    reply.id = id;
    return reply;
}