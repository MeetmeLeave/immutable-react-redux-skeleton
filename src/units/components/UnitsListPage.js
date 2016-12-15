import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UnitsListRow from './UnitsListRow';
import * as unitActions from '../actions';

/**
* Component is described here.
*
* @example ./UnitsListPage.md
*/
export class UnitsListPage extends React.Component {
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
                        <UnitsListRow key={unit.id} unit={unit} deleteUnit={this.deleteUnit} />
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