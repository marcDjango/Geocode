import { BrowserRouter } from "react-router-dom";
import { CurrentUserContextProvider } from "./contexte/CurrentUserContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <AppRoutes />
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
