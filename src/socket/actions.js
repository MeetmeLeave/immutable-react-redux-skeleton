import * as actionTypes from './actionTypes';

export const setClientId = (clientId) => ({
    type: actionTypes.SET_CLIENT_ID,
    clientId
});

export const setConnectionState = (state, connected) => ({
    type: actionTypes.SET_CONNECTION_STATE,
    state,
    connected
});

export const setState = (units) => ({
    type: actionTypes.SET_STATE,
    units
});