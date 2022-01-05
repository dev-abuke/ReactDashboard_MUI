import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import CONSTANTS from "../../../Helpers/Constants";
import ValidationRules from "../../../Helpers/DataValidators";
import DataRequester from "../../../Helpers/DataRequester";
import LoginUI from '../UI/LoginUI';

const { getDataFromForm, checkEmptyAndUndefined } = ValidationRules();
const { postDataTo } = DataRequester();

const getUserDataFromToken = (token) => {
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

export default function SignIn({ setToken }) {

    console.log("Login Logic Loaded : ")

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: "none",
    message: "",
  });
  const navigate = useNavigate();

  const onResponseToLoginUser = (response) => {

    setLoading(false);

    const status = response.data.status;
    const token = response.data.result;

    if (status) {

      setToken(token);

      localStorage.setItem(
        CONSTANTS.LOGGED_IN_USERDATA,
        JSON.stringify(getUserDataFromToken(token))
      );

      navigate(CONSTANTS.ROUTE.DASHBOARD);
    } else {

      console.log("The error in login ", response.data.error);
      updateError("show", response.data.error);
    }
  };

  async function loginUser(userData) {

    postDataTo("/user/signIn", userData)
      .then(response => {

        onResponseToLoginUser(response);
      })
      .catch(errorLogin => {

        setLoading(false);
        updateError("show", errorLogin.response.data.error);
        console.log("The error in login catch : ", errorLogin.response);
    });
  }

  const updateError = (display, message) => {
    setError((previousState) => {
      return {
        ...previousState,
        display: display,
        message: message,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Shows the loading view in the button
    setLoading(true);

    // @getDataFromForm() a methode from helper which sends and object of datas field by the user
    const { userName, password } = getDataFromForm(event.currentTarget);

    // @checkEmptyAndUndefined() a methode from helper to check empty and undefined fields
    if (checkEmptyAndUndefined(userName)) {
      updateError("show", "Username Can not be Empty!");
      setLoading(false);
      return;
    }
    if (checkEmptyAndUndefined(password)) {
      updateError("show", "Password Can not be Empty!");
      setLoading(false);
      return;
    }

    // @updateError() a method so we do not type @param display and @param errorMessage everytime
    updateError("none", "");

    // @loginUser a method to authenticate user
    loginUser({
      userName: userName,
      password: password,
    });
  };

  return (<LoginUI loading={loading} handleSubmit={handleSubmit} error={error} />);
}
