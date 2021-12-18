import React from "react";
import { Navigate, Route } from "react-router-dom";

const AuthRoute = props => {
  const { isAuthUser } = props;
  if (isAuthUser) return <Route path="/home" exact element={<Navigate to="/home" />} />;
  else if (!isAuthUser) return <Route path="/" exact element={<Navigate to="/" />} />;

  return <Route {...props} />;
};

export default AuthRoute;