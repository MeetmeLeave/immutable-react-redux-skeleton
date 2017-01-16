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
                <div className="sidebar-desktop">
                    Total units count: {this.props.units.length}
                </div>
                <div className="table-wrapper-desktop">
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <td></td>
                                <td>#</td>
                                <td>Title</td>
                            </tr>
                            {this.props.units.map((unit) => {
                                return (
                                    <UnitsListRow key={unit.id} unit={unit} deleteUnit={this.deleteUnit} />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <button onClick={this.addUnit} className="btn btn-primary">Add Unit</button>
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