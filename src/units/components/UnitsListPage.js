import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as unitActions from '../actions';

/**
* Component is described here.
*
* @example ../../../docs/UnitsListPage.md
*/
class UnitsListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        };

        this.addUnit = this.addUnit.bind(this);
        this.deleteUnit = this.deleteUnit.bind(this);
    }

    addUnit() {
        this.props.actions.add(
            {
                title: `Unit: ${this.state.counter}`
            }
        );

        this.setState({ counter: this.state.counter + 1 });
    }

    deleteUnit(event, id) {
        event.preventDefault();

        this.props.actions.del(
            id
        );
    }

    render() {
        /* eslint-disable react/jsx-no-bind */
        return (
            <div>
                Total units count: {this.props.units.length}
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-1">Id</div>
                    <div className="col-md-4">Title</div>
                </div>
                {this.props.units.map((unit) => {
                    return (
                        <div className="row" key={unit.id}>
                            <a href="#" onClick={(event) => this.deleteUnit(event, unit.id)} className="col-md-2">Delete</a>
                            <div className="col-md-1">{unit.id}</div>
                            <div className="col-md-4">{unit.title}</div>
                        </div>
                    );
                })}
                <button onClick={this.addUnit} >Add Unit</button>
            </div>
        );
    }
}

UnitsListPage.propTypes = {
    /**
	 * List of units to be displayed on a page.
	 */
    units: PropTypes.array,
    /**
	 * Redux actions binding.
	 */
    actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        units: state.get('units').toArray()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(unitActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitsListPage);