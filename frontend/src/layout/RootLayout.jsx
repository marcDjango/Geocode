import React from "react";
import { Outlet } from "react-router-dom";
import "../reset.css";

function RootLayout() {
  return (
    <div className="root-layout">
      <header>importer ici la navbar</header>
      <main>
        Root Layout
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
