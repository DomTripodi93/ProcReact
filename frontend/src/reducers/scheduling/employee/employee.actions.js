import rootHttp from '../../root-http';
import EmployeeActionTypes from './employee.types';

export function fetchSingleEmployee(id){
    rootHttp.fetchById("employee", id)
        .then((responseData) => {
                dispatch(setSingleEmployee(responseData));
            }
        )
    
}
//Gets specific employee by name

export function fetchEmployees(){
    rootHttp.fetchAll("employee/byUser")
        .then((responseData) => {
                dispatch(setEmployees(responseData));
            }
        )
}
//Gets all employees

export function fetchEmployeesByDepartment(department){
    rootHttp.fetchAll("employee/byDepartment/" + department)
        .then((responseData) => {
                dispatch(setEmployees(responseData));
            }
        )
}
//Gets all employees for a department

export function setEmployees(employees){
    return {
        type: EmployeeActionTypes.SET_EMPLOYEES,
        payload: employees
    }
}

export function setSingleEmployee(employee){
    return {
        type: EmployeeActionTypes.SET_SINGLE_EMPLOYEE,
        payload: employee
    }
}

export function addEmployee(data){
    rootHttp.addItem("employee", data);

    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE,
        payload: data
    }
}
//Posts new employee to API

export function updateEmployee(data, id){
    rootHttp.updateItemById("employee", data, id);

    return {
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        payload: data
    }
}
//Updates function for employee

export function deleteEmployee(id){
    rootHttp.deleteItemById("employee", id);

    return {
        type: EmployeeActionTypes.DELETE_EMPLOYEE,
        payload: id
    }
}
//Deletes selected employee