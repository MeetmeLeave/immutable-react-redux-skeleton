import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

/**
 * Header class description goes here.
 * @example ./Header.md
 */
const Header = () => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/units" activeClassName="active">Units</Link>
        </nav>
    );
};

export default Header;