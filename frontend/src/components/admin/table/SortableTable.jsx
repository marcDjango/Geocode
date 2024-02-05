import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import ModalEdit from "../modal/modal";

import "./tableur.scss";

function SortableTable({ dataLoad }) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const location = useLocation();
  const { sortOrder, sortColumn } = location.state || {
    sortOrder: "",
    sortColumn: "",
  };
  const pathActually = location.pathname;
  const newPath = pathActually.split("/");
  const [issortOrder, setSortOrder] = useState(sortOrder);
  const [issortColumn, setSortColumn] = useState(sortColumn);

  const handleSort = (col) => {
    let newSortOrder = "asc";

    if (issortColumn === col && issortOrder === "asc") {
      newSortOrder = "desc";
    }
    setCurrentPage(1);
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
  const EditDataById = (id) => {
    setIdEdit(id);
    setDataEdit(dataLoad.filter((editable) => editable.id === id));
  };
  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataLoad.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {isEditModal && (
        <ModalEdit
          dataEdit={dataEdit[0]}
          action={newPath[2]}
          id={idEdit}
          setIsEditModal={setIsEditModal}
        />
      )}
      <div className="tableSection">
        <table className="workshopsTable">
          <TableHeader
            keys={keys}
            sortOrder={issortOrder}
            sortColumn={issortColumn}
            onSort={handleSort}
          />
          <TableBody
            dataLoad={currentItems}
            sortOrder={issortOrder}
            sortColumn={issortColumn}
            setIsEditModal={setIsEditModal}
            EditDataById={EditDataById}
          />
        </table>
        {/* Pagination */}
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= dataLoad.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

SortableTable.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default SortableTable;
