import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: false,
});

const AuthContextProvider = function ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
