import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../reset.css";

function RootLayout() {
  const [auth, setAuth] = useState();

  return (
    <div className="root-layout">
      <header>importer ici la navbar</header>
      <main>
        {auth && <p>Hello {auth.user.email}</p>}
        <Outlet context={{ auth, setAuth }} />
      </main>
    </div>
  );
}

export default RootLayout;
