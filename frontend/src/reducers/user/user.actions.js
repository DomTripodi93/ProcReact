import UserActionTypes from './user.types';

export const signInUser = (user) => ({
    type: UserActionTypes.SIGNIN_USER,
    payload: user
});

export const signOutUser = () => ({
    type: UserActionTypes.SIGNOUT_USER
});