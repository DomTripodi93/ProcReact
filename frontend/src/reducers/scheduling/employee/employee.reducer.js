import EmployeeActionTypes from './employee.types';

const INITIAL_STATE = {
    employees: [],
    selectedEmployee: {},
}

const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.SET_SINGLE_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.payload
            };
        case EmployeeActionTypes.SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.data
            };
        case EmployeeActionTypes.ADD_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.push(action.payload)
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees
                    .filter((value)=>{
                        return value.employeeId != action.payload.employeeId 
                    })
                    .push(action.payload)
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees
                    .filter((value)=>{
                        return value.employeeId != action.payload
                    })
            };
        default:
            return state;
    }
}

export default employeeReducer;