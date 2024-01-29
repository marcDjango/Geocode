import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CurrentUserContextProvider } from "./contexte/CurrentUserContext";
import AppRoutes from "./routes/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CurrentUserContextProvider>
    <RouterProvider router={AppRoutes} />
  </CurrentUserContextProvider>
);
