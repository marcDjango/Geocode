import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import ContactPage from "../../user/ContactPage/ContactPage";

import "./tableur.scss";

function SortableTable({ dataLoad }) {
  const [isEditModal, setIsEditModal] = useState(false);

  const location = useLocation();
  const { sortOrder, sortColumn } = location.state || {
    sortOrder: "",
    sortColumn: "",
  };
  const [issortOrder, setSortOrder] = useState(sortOrder);
  const [issortColumn, setSortColumn] = useState(sortColumn);

  const handleSort = (col) => {
    let newSortOrder = "asc";

    if (issortColumn === col && issortOrder === "asc") {
      newSortOrder = "desc";
    }
    dataLoad.sort((a, b) => {
      if (typeof a[col] === "number" && typeof b[col] === "number") {
        if (newSortOrder === "asc") {
          return a[col] - b[col];
        }
        return b[col] - a[col];
      }

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
    <>
      {isEditModal && <ContactPage />}
      <div className="tableSection">
        <table className="workshopsTable">
          <TableHeader
            keys={keys}
            sortOrder={issortOrder}
            sortColumn={issortColumn}
            onSort={handleSort}
          />
          <TableBody
            dataLoad={dataLoad}
            sortOrder={issortOrder}
            sortColumn={issortColumn}
            setIsEditModal={setIsEditModal}
          />
        </table>
      </div>
    </>
  );
}

SortableTable.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default SortableTable;
