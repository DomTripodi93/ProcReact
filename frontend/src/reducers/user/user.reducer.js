import UserActionTypes from './user.types';

const INITIAL_STATE ={
    userToken: null,
    userId: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_USER:
            return {
                ...state,
                userToken: action.payload.token,
                userId: action.payload.id
            }
        case UserActionTypes.SIGNOUT_USER:
            return {
                ...state,
                userToken: null,
                userId: null
            }
    }
}

export default userReducer;