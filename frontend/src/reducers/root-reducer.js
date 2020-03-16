import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import { dropDownReducer } from './drop-down/drop-down.reducer'
import employeeReducer from './schedule/employee/employee.reducer';
import departmentReducer from './process/department/department.reducer';
import objectiveReducer from './process/objective/objective.reducer';


export default combineReducers({
    user: userReducer,
    dropDown: dropDownReducer,
    employee: employeeReducer,
    department: departmentReducer,
    objective: objectiveReducer
})