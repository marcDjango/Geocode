import React from "react";
import { Outlet } from "react-router-dom";
import "../reset.css";
import { useCurrentUserContext } from "../contexte/CurrentUserContext";

function RootLayout() {
  const { auth } = useCurrentUserContext();
  const userItem = JSON.parse(localStorage.getItem("user"));
  console.info(auth);
  console.info(userItem);
  return (
    <div className="root-layout">
      <header>Importer ici la navbar</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
