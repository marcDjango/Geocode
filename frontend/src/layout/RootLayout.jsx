import React from "react";
import { Outlet } from "react-router-dom";
import "../reset.css";
import Navbar from "../components/navbar/Navbar";

function RootLayout() {
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
