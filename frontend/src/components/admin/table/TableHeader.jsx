import React from "react";
import PropTypes from "prop-types";

function TableHeader({ keys, sortOrder, sortColumn, onSort }) {
  return (
    <thead>
      <tr>
        {keys.map((key) => (
          <th key={key} onClick={() => onSort(key)}>
            <div className="field-table">
              <p>{key}</p>
              {sortOrder === "asc" && sortColumn === key ? (
                <i className="fi fi-rr-angle-small-up" />
              ) : (
                <i className="fi fi-rr-angle-small-down" />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  keys: PropTypes.arrayOf.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
