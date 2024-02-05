import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "../../form/form";
import contact from "../../user/ContactPage/config.json";
import user from "../../user/RegistrationPage/config.json";
import "./modal.scss";
import Alert from "../../alert/alert";

const { VITE_BACKEND_URL } = import.meta.env;

function ModalEdit({ dataEdit, action, id, setIsEditModal }) {
  const [isErrors, setIsErrors] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const FormPostData = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    let data = Object.fromEntries(form);

    // Convertir la valeur de is_admin en nombre si elle existe
    if (data.is_admin !== undefined) {
      data = { ...data, is_admin: parseInt(data.is_admin, 10) };
      // Ou utiliser data = { ...data, is_admin: Number(data.is_admin) };
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/${action}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const dataresponse = await response.json();
        if (dataresponse.validationErrors.length > 0) {
          setIsErrors(dataresponse.validationErrors);
        }
        throw new Error("Erreur lors de l'inscription");
      } else {
        setIsErrors(null);
        setIsSubmit(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [dataFormEdit, setDataformEdit] = useState("");

  useEffect(() => {
    if (action === "contacts") {
      contact.object.value = dataEdit.object;
      contact.name.value = dataEdit.name;
      contact.email.value = dataEdit.email;
      contact.subject.value = dataEdit.subject;
      setDataformEdit(contact);
    } else if (action === "users") {
      const {
        password,
        confirm_password: confirmPassword,
        ...updatedUserData
      } = user; // Créez une copie de l'objet user

      // Ajoutez la propriété is_admin à updatedUserData
      updatedUserData.is_admin = {
        value: dataEdit.is_admin,
        type: "number",
        option: "required",
      };

      // Mettez à jour les autres propriétés de updatedUserData avec celles de dataEdit
      for (const property in dataEdit) {
        if (updatedUserData[property] !== undefined) {
          updatedUserData[property].value = dataEdit[property];
        }
      }

      setDataformEdit(updatedUserData);
    }
  }, [action, dataEdit, user]);

  return (
    <div
      className="content-modal"
      aria-label="openModal"
      onClick={() => setIsEditModal(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          setIsEditModal(false);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="body-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsEditModal(false);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div>
          <button
            className="btn-close-modal"
            type="button"
            onClick={() => setIsEditModal(false)}
          >
            X
          </button>
        </div>
        <Form
          data={dataFormEdit}
          FormPostData={FormPostData}
          isAuth={false}
          isAdmin
        />

        {(isErrors || isSubmit) && (
          <Alert errors={isErrors} submit={isSubmit} />
        )}
      </div>
    </div>
  );
}

export default ModalEdit;

ModalEdit.propTypes = {
  dataEdit: PropTypes.shape.isRequired, // Remplacez le type par le type réel de dataEdit
  action: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setIsEditModal: PropTypes.func.isRequired,
};
