import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import bootstrap from '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

/**
 * Header class description goes here.
 * @example ./Header.md
 */
const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName={bootstrap.active}>Home</IndexLink>
            {" | "}
            <Link to="/units" activeClassName={bootstrap.active}>Units</Link>
        </nav>
    );
};

export default Header;