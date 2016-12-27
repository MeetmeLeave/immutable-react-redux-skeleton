import React, { PropTypes } from 'react';

/** 
* 
* @example ./UnitsListRow.md
*/
const UnitsListRow = ({unit, deleteUnit}) => {
    return (
        <tr key={unit.id}>
            <td>
                <a href="#" onClick={(event) => deleteUnit(event, unit.id)}>Delete</a>
            </td>
            <td>
                {unit.id}
            </td>
            <td>
                {unit.title}
            </td>
        </tr>
    );
};

UnitsListRow.propTypes = {
    unit: PropTypes.object.isRequired,
    deleteUnit: PropTypes.func.isRequired
};

export default UnitsListRow;