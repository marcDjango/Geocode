import React, { useState } from "react";
import Input from "../../input/input";

const { VITE_BACKEND_URL } = import.meta.env;

function RegistrationForm() {
  const userKey = [
    "name",
    "firstname",
    "email",
    "gender",
    "date_of_birth",
    "postal_code",
    "city",
    "number_vehicles",
    "password",
    "profil_image",
    "role",
  ];

  // Utiliser un objet avec des valeurs par défaut au lieu d'un tableau
  const [data, setData] = useState(
    userKey.reduce((acc, key) => {
      acc[key] = ""; // Valeur par défaut pour chaque clé
      return acc;
    }, {})
  );

  // Utiliser une fonction pour mettre à jour les données lorsqu'un champ est modifié
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const FormPostData = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu JSON
        },
        body: JSON.stringify(data), // Convertir l'objet data en chaîne JSON
      });
      console.info(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={FormPostData}>
        {userKey.map((key) => (
          <Input
            key={key}
            name={key}
            value={data[key]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
