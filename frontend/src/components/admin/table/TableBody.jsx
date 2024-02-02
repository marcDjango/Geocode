/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

function TableBody({ dataLoad, setIsEditModal, EditDataById }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <tbody>
      {dataLoad.map((item) => {
        return (
          <tr key={item.id} className="actionButtons">
            <td className="actionButtons">
              <button
                type="button"
                aria-label="edit"
                className="edit-button"
                onClick={() => {
                  setIsEditModal(true);
                  EditDataById(item.id);
                }}
              >
                <i className="fi fi-rr-edit" />
              </button>
              <button
                type="button"
                aria-label="delete"
                className="delete-button"
                onClick={() =>
                  navigate(`/admin/delete/${item.id}`, {
                    state: {
                      path: location.pathname,
                    },
                  })
                }
              >
                <i className="fi fi-rr-trash" />
              </button>
            </td>
            {Object.values(item).map((value, index) => (
              <td key={`${value}_${item.id}_${index}`}>{value}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

TableBody.propTypes = {
  dataLoad: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  setIsEditModal: PropTypes.func.isRequired,
  EditDataById: PropTypes.func.isRequired,
};

export default TableBody;
