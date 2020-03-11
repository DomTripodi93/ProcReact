import UserActionTypes from './user.types';
import axios from 'axios';


const ROOT_URL = 'http://localhost:8000/api';

export async const regiserUser = (user) => {
    await axios.post({ROOT_URL} + "/register", user).resolve()

    return {
        type: UserActionTypes.REGISTER_USER
    }
}

export const signInUser = (user) => ({
    type: UserActionTypes.SIGNIN_USER,
    payload: user
});

export const signOutUser = () => ({
    type: UserActionTypes.SIGNOUT_USER
});