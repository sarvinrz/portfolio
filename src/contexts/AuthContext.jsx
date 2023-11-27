import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: !!localStorage.getItem("token"),
  setIsLoggedIn: () => {},
});

const AuthContextProvider = function ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
