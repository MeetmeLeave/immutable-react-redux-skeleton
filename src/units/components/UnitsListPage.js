import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as unitActions from '../actions';

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
                id: this.state.counter,
                title: `unit: ${this.state.counter}`
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
                    )
                })}
                <button onClick={this.addUnit} >Add Unit</button>
            </div>
        );
    }
}

UnitsListPage.propTypes = {
    units: PropTypes.array,
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