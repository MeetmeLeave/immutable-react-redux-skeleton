import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './home/components/HomePage';
import units from './units/components';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/units" component={units.UnitsListPage} />
    </Route>
);