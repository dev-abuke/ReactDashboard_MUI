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
 
    const sendCreateUserReq = (relativeUrl, data) => {
        
        return Post(relativeUrl, data)
    }

    const sendSignInReq = (relativeUrl, data) => {

        return Post(relativeUrl, data)

    }

    const sendGetUsersReq = (relativeUrl) => {
        
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
        sendCreateUserReq,
        sendSignInReq,
        sendGetUsersReq
    }
}