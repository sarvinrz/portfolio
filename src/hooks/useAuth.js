import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = function () {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = authContext;

  return { isLoggedIn, setIsLoggedIn };
};

export default useAuth;
