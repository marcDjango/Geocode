import React from "react";
import { Outlet } from "react-router-dom";
import "../reset.css";
import { useCurrentUserContext } from "../contexte/CurrentUserContext";
import Navbar from "../components/navbar/Navbar";

function RootLayout() {
  const { auth } = useCurrentUserContext();
  const userItem = JSON.parse(localStorage.getItem("user"));
  console.info(auth);
  console.info(userItem);
  return (
    <div style={{ position: "relative" }}>
      <header
        style={{
          position: "absolute",
          top: "3%",
          left: "3%",
          zIndex: 999,
        }}
      >
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
