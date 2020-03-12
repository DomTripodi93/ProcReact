import UserActionTypes from './user.types';
import axios from 'axios';


const ROOT_URL = 'http://localhost:5000/api';

export const registerUser = (user, callback) => {
    axios.post(`${ROOT_URL}/auth/register`, user).then(()=>callback());

    return {
        type: UserActionTypes.REGISTER_USER
    }
};

export const signInUser = (user, callback) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/auth/login`, user)
            .then( response =>{
                dispatch(setUserData(response.data)); 
                callback();
            })
        }
};

export const setUserData = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('id', user.id);

    return{
        type: UserActionTypes.SIGNIN_USER,
        payload: user
    };
};

export const signOutUser = () => ({
    type: UserActionTypes.SIGNOUT_USER
});

export const checkUser = (id, token) => {
    axios.get(`${ROOT_URL}/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(()=>{
        setUserData({
            token: token,
            id: id
        })
    })
    .catch(()=>{
            signOutUser();
    });
}