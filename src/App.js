import React, { PropTypes } from 'react';
import Header from './common/components/Header';
import { connect } from 'react-redux';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    render() {

        return (
            <div className={`${bootstrap["container-fluid"]}`}>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;