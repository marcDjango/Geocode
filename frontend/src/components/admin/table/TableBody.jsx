import React from "react";
import PropTypes from "prop-types";

function TableBody({ dataLoad }) {
  return (
    <tbody>
      {dataLoad.map((item) => (
        <tr key={item}>
          {Object.values(item).map((value, index) => (
            <td key={(value, index)}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default TableBody;
