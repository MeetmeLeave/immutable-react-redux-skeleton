import { List, Map } from 'immutable';
import * as actionTypes from './actionTypes';
import initState from '../initState';

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setState(state, newState) {
    return state.merge(newState);
}

export default function (state = initState.socket, action) {
    switch (action.type) {
        case actionTypes.SET_CLIENT_ID:
            return state.set('clientId', action.clientId);
        case actionTypes.SET_CONNECTION_STATE:
            return setConnectionState(state, action.state, action.connected);
    }
    return state;
}