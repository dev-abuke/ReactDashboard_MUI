import { useState } from 'react';
//import { useNavigate } from "react-router";

export default function useToken() {
 // var nav = useNavigate();
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
    //nav("/home")
    console.log("token set " , userToken)
  };

  return {
    token,
    setToken: saveToken
  }
}