import Axios from 'axios';
import CONSTANTS from './Constants';

export default function DataRequester() {

    const config = {
        baseURL: CONSTANTS.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(sessionStorage.getItem(CONSTANTS.TOKEN_NAME))
        }
    }
 
    const postDataTo = (relativeUrl, data) => {

        return Post(relativeUrl, data)
    }

    const getDataFrom = (relativeUrl) => {

        config.headers['authorization'] = JSON.parse(sessionStorage.getItem(CONSTANTS.TOKEN_NAME))
        return Get(relativeUrl)

    }

    const Post = (relativeUrl, data) => {

        return Axios.post(
            relativeUrl,
            data,
            config
        )
    }

    const Get = (relativeUrl) => {

        return Axios.get(
            relativeUrl,
            config
        )
    }

    return {
        postDataTo,
        getDataFrom,
    }
}