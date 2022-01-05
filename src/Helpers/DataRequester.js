import Axios from "axios";
import CONSTANTS from "./Constants";

export default function DataRequester() {
  const config = {
    baseURL: CONSTANTS.API_URL,
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(sessionStorage.getItem(CONSTANTS.TOKEN_NAME)),
    },
  };

  const postDataTo = (relativeUrl, data) => {
    return Post(relativeUrl, data);
  };

  const getDataFrom = (relativeUrl) => {
    config.headers["authorization"] = JSON.parse(
      sessionStorage.getItem(CONSTANTS.TOKEN_NAME)
    );
    return Get(relativeUrl);
  };

  const Post = (relativeUrl, data) => {
    return Axios.post(relativeUrl, data, config);
  };

  const Get = (relativeUrl) => {
    return Axios.get(relativeUrl, config);
  };

  const getDataFromServer = (url, setFetched, navigate) => {
    getDataFrom(url)
      .then((response) => {
        console.log("Data Requester : ", response.data.result);

        return response.data.result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return {
    postDataTo,
    getDataFrom,
    getDataFromServer,
  };
}
