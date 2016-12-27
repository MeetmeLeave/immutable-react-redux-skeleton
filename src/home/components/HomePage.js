import React, { PropTypes } from 'react';
import css from './HomePage.css';
import bootstrap from '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 * Home Page class description goes here.
 * @example ./HomePage.md
 */
class HomePage extends React.Component {
    render() {
        return (
            <div className={css.homeContainer}>
                This is our <kbd>Home page</kbd>
            </div>
        );
    }
}

export default HomePage;