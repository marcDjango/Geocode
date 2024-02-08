import React from "react";
import { Outlet } from "react-router-dom";
import { useCurrentUserContext } from "../contexte/CurrentUserContext";
import Navbar from "../components/navbar/Navbar";
import LogInOut from "../components/logInOut/LogInOut";
import "../reset.css";

function RootLayout() {
  const { auth } = useCurrentUserContext();
  console.info(auth);
  return (
    <div>
      <header style={{ position: "relative" }}>
        <Navbar />
        <LogInOut />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
