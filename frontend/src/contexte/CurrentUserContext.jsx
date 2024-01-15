import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export const useCurrentUserContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  const memoizedUser = useMemo(() => {
    return { auth, setAuth };
  }, [auth]);

  return (
    <CurrentUserContext.Provider value={memoizedUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
CurrentUserContextProvider.propTypes = {
  children: PropTypes.node,
};
CurrentUserContextProvider.defaultProps = {
  children: "",
};
