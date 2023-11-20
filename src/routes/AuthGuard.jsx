import React from "react";
import useAuth from "../hooks/useAuth";

const AuthGuard = function () {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <></>;
  }

  return null;
};

export default React.memo(AuthGuard);
