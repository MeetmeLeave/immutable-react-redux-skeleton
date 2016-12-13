import { Map } from 'immutable';
import initState from './initState';
import units from './units';

import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const navigationReducer = (state = initState.navigation, {type, payload}) => {
    if (type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', payload);
    }

    return state;
};

export default combineReducers({
    [units.constants.NAME]: units.reducer,
    routing: navigationReducer
});
