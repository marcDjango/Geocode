import React from "react";
import PropTypes from "prop-types";
import Select from "../select/select";
import Input from "../input/input";

function Form({ data, FormPostData }) {
  return (
    <div className="registration-contain">
      <form className="df-column" onSubmit={FormPostData}>
        {Object.keys(data).map((fieldName) =>
          data[fieldName].type !== "select" ? (
            <Input
              key={fieldName}
              name={fieldName}
              type={data[fieldName].type}
              placeholder={data[fieldName].value}
              required={data[fieldName].option === "required"}
            />
          ) : (
            <Select
              key={fieldName}
              entry={fieldName}
              name={data[fieldName].value}
              objet={data[fieldName].option}
            />
          )
        )}
        <button className="signin-btn-submit" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}

export default Form;

const dataShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
});

Form.propTypes = {
  data: PropTypes.objectOf(dataShape).isRequired,
  FormPostData: PropTypes.func.isRequired,
};
