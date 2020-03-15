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
                employees: [...state.employees, action.payload]
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE:
            return {
                ...state,
                employees: [
                    action.payload,
                    ...state.employees
                        .filter((value)=>{
                            return value.employeeId !== action.payload.employeeId 
                        })]
                        .sort((first, second)=>{
                            if(first.employeeId > second.employeeId){
                                return 1
                            } else {
                                return -1
                            }}
                        )
            };
        case EmployeeActionTypes.DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees
                    .filter((value)=>{
                        return value.employeeId !== action.payload
                    })
            };
        default:
            return state;
    }
}

export default employeeReducer;