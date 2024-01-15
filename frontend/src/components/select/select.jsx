import React, { useState } from "react";
import PropTypes from "prop-types";

import "./select.scss";

function Select({ name, objet, entry }) {
  const [valueInput, setValueInput] = useState("");
  const handleOnChange = (e) => {
    setValueInput(e.target.value);
  };
  return (
    <select
      className="select-style typo"
      name={entry}
      value={valueInput || ""} // Définir la valeur sélectionnée pour contrôler le composant
      onChange={handleOnChange} // Appeler la fonction de gestion des changements lorsqu'une option est sélectionnée
    >
      <option className="select-option-style" value="" disabled>
        {name}
      </option>
      {Object.keys(objet).map((item) => (
        <option key={item} value={objet[item].value}>
          {objet[item].title}
        </option>
      ))}
    </select>
  );
}
export default Select;

Select.propTypes = {
  name: PropTypes.string.isRequired,
  objet: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  entry: PropTypes.string.isRequired,
};
