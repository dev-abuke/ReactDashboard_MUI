import React from 'react';
import { Navigate } from "react-router-dom";
import useToken from "./useToken";
import jwt from 'jsonwebtoken';

const verifyToken = (token) => {

  var tokenValue = token.split(" ")[1];

  if (!tokenValue) {
    throw new Error("Invalid token");
  }
  var userData = jwt.decode(tokenValue);

  if (userData == null) {
    throw new Error("Unauthorized");
  }
  return userData.data;
};

function PrivateRoute({ children }) {

  const { token } = useToken();
 
  try{
    verifyToken(token)
  }catch(error) {
    return (<Navigate to="/" />);
  }
  console.log("In Auth Route : The Children is : ", children)
  return children
}
export default PrivateRoute;