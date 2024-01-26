import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./tableur.scss";

function SortableTable({ dataLoad }) {
  const [sortOrder, setSortOrder] = useState("");
  const [sortColumn, setSortColumn] = useState("");

  const handleSort = (col) => {
    let newSortOrder = "asc";

    if (sortColumn === col && sortOrder === "asc") {
      newSortOrder = "desc";
    }

    dataLoad.sort((a, b) => {
      const aValue = a[col].toString().toLowerCase();
      const bValue = b[col].toString().toLowerCase();

      if (newSortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setSortColumn(col);
    setSortOrder(newSortOrder);
  };

  const keys = Object.keys(dataLoad[0]);

  return (
    <div className="tableSection">
      <table className="workshopsTable">
        <TableHeader
          keys={keys}
          sortOrder={sortOrder}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <TableBody dataLoad={dataLoad} />
      </table>
    </div>
  );
}

SortableTable.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default SortableTable;
