import React from 'react';
const styles = require('./HomePage.css');

/**
 * Home Page class description goes here.
 * @example ./HomePage.md
 */
class HomePage extends React.Component {
    render() {
        return (
            <div className={styles.homeContainer}>
                <p className="text-primary">Home lol</p>
            </div>
        );
    }
}

export default HomePage;