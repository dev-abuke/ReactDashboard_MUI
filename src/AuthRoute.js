import React from 'react';
import { Navigate, Route } from "react-router-dom";
import useToken from "./useToken";

function PrivateRoute({ children }) {
  const { token } = useToken();
  console.log("Auth route",  token)
 
  if(!token){
    return (<Navigate to="/" />);
  }
  console.log("passed auth")
  return children
}
export default PrivateRoute;