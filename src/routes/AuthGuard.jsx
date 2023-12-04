import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import PATHS from "./paths";

const AuthGuard = function ({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={PATHS.login} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
