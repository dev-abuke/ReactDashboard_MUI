import { useState } from 'react';
import CONSTANTS from './Helpers/Constants'

export default function useToken() {

  const getToken = () => {
    const tokenString = sessionStorage.getItem(CONSTANTS.TOKEN_NAME);
    return JSON.parse(tokenString);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem(CONSTANTS.TOKEN_NAME, JSON.stringify(userToken));
    setToken(userToken);
  };
  
  return {
    token,
    setToken: saveToken,
  }
}