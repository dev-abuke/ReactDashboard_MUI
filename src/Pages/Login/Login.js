import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../../Helpers/Constants";
import ValidationRules from "../../Helpers/DataValidators";
import DataRequester from "../../Helpers/DataRequester";
import LoginUI from "./LoginUI";

const { getDataFromForm, getUserDataFromToken, validateData} = ValidationRules();
const { postDataTo } = DataRequester();

export default function SignIn({ setToken }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: "none",
    message: "",
  });
  const navigate = useNavigate();

  const updateError = (display, message) => {

    setError((previousState) => {
      return {
        ...previousState,
        display: display,
        message: message,
      };
    });
  };

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

      navigate(CONSTANTS.ROUTE.HOME);
    } else {

      console.log("The error in login ", response.data.error);
      throw new Error(response.data.error);
    }
  };

  async function loginUser(userData) {

    postDataTo("/user/signIn", userData)
      .then((response) => {
        onResponseToLoginUser(response);
      })
      .catch((errorLogin) => {

        setLoading(false);
        updateError(
          "show",
          errorLogin.response === undefined
            ? errorLogin.message
            : errorLogin.response.data.error
        );
        console.log("The error in login catch : ", errorLogin);
      });
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    // Shows the loading view in the button
    setLoading(true);

    // @getDataFromForm() a methode from helper which sends and object of datas field by the user
    const { userName, password } = getDataFromForm(event.currentTarget);

    try {

      validateData({ userName, password });
    } catch (err) {

      updateError("show", err.message);
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

  return (
    <LoginUI loading={loading} handleSubmit={handleSubmit} error={error} />
  );
}