import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
      
  console.log("get token call")
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    console.log("save token call")
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken,
  }
}