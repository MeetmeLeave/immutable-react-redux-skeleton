import Immutable from 'immutable';
import initState from '../initState';
import * as actionTypes from './actionTypes';
// import * as socketActionType from '../socket/actionTypes';

export default function (state = initState.units, action) {
    switch (action.type) {
        case actionTypes.LOADED:
            return new Immutable.List(action.units);
        case actionTypes.ADDED:
            return state.push(action.unit);
        case actionTypes.DELETED:
            return state.filter(unit => unit.id !== action.id);
        case actionTypes.EDITED:
            return updateUnitById(state, action.unit);
    }

    return state;
}

function updateUnitById(state, unit) {
    let index = state.findIndex(unit => unit.id === unit.id);
    return state.update(index, () => {
        return unit;
    });
}