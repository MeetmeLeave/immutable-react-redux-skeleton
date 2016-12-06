import Immutable from 'immutable';
import initState from '../initState';
import * as actionTypes from './actionTypes';

export default function (state = initState.units, action) {
    switch (action.type) {
        case 'socket/SET_STATE':
            return new Immutable.List(action.units);
        case actionTypes.ADDED:
            return state.push(action.unit);
        case actionTypes.DELETED:
            return state.filter(unit => unit.id !== action.id);
        case actionTypes.EDITED:
            let index = state.findIndex(unit => unit.id === action.unit.id);
            return state.update(index, () => {
                return action.unit;
            });
    }

    return state;
}