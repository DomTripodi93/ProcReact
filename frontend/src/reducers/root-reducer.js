import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import { dropDownReducer } from './drop-down/drop-down.reducer'

export default combineReducers({
    user: userReducer,
    dropDown: dropDownReducer
})