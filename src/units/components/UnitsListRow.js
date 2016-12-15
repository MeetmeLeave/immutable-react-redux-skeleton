import React, { PropTypes } from 'react';

const UnitsListRow = ({unit, deleteUnit}) => {
    return (
        <div className="row" key={unit.id}>
            <a href="#" onClick={(event) => deleteUnit(event, unit.id)} className="col-md-2">Delete</a>
            <div className="col-md-1">{unit.id}</div>
            <div className="col-md-4">{unit.title}</div>
        </div>
    );
};

UnitsListRow.propTypes = {
    unit: PropTypes.object.isRequired,
    deleteUnit: PropTypes.func.isRequired
};

export default UnitsListRow;