import React from "react";
import PropTypes from "prop-types";

function TableBody({ dataLoad }) {
  return (
    <tbody>
      {dataLoad.map((item) => {
        return (
          <tr key={item.id}>
            {Object.values(item).map((value) => (
              <td key={`${value}_${item.id}`}>{value}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

TableBody.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default TableBody;
