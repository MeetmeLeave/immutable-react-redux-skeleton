import * as actions from '../src/units/actionTypes';

let counter = 2;

const units = [
    { id: 0, title: 'Unit 0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' },
    { id: 1, title: 'Unit 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' },
    { id: 2, title: 'Unit 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra ac nibh non maximus. Sed ut metus sodales, commodo risus sit amet, suscipit urna. Nullam velit eros, gravida in dapibus nec, hendrerit ac massa. Vivamus nec velit mollis, maximus metus quis, ornare tortor. In sodales tellus non tristique mattis. Fusce ipsum ex, scelerisque sagittis rhoncus quis, tristique eget velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque mattis ex eu sem sagittis consectetur. Sed ultrices fringilla varius. Donec suscipit elit quis erat vestibulum, id gravida nibh molestie. Proin ultricies semper orci, nec semper purus porta sed. Proin vel felis sit amet nisi tristique viverra non eget odio. Praesent tempor tortor a sodales aliquam.' }
];

export default class SocketServer {
    constructor() {
        const WebSocketServer = require('ws').Server,
            wss = new WebSocketServer({port: 8090});

        wss.on('connection', (socket) => {
            new SocketClient(socket);
        });
    }
}

class SocketClient {
    constructor(socket) {
        socket.on('message', (e) => {
            const action = JSON.parse(e);
            this.handleAction(socket, action);
        });
    }

    handleAction(socket, action) {
        let reply = {};
        console.log('action: ', action);
        switch (action.type) {
            case 'load':
                reply.type = actions.LOADED;
                reply.units = units;
                socket.send(JSON.stringify(reply));
                break;
            case actions.ADD:
                socket.send(JSON.stringify(this.handleAdd(action, reply)));
                break;
            case actions.EDIT:
                socket.send(JSON.stringify(this.handleEdit(action, reply)));
                break;
            case actions.DELETE:
                socket.send(JSON.stringify(this.handleDelete(action, reply)));
                break;
        }
    }

    handleAdd(action, reply) {
        let unitToAdd = action.unit;
        counter += 1;
        unitToAdd.id = counter;
        units.push(unitToAdd);
        reply.type = actions.ADDED;
        reply.unit = unitToAdd;
        return reply;
    }

    handleEdit(action, reply) {
        let unitToEdit = action.unit;
        units[+ unitToEdit.id] = unitToEdit;
        reply.type = actions.EDITED;
        reply.unit = unitToEdit;
        return reply;
    }

    handleDelete(action, reply) {
        let id = action.id;
        units.splice(id, 1);
        reply.type = actions.DELETED;
        reply.id = id;
        return reply;
    }
}