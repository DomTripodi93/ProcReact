import rootHttp from '../../root-http';
import EmployeeActionTypes from './employee.types';


const http = new rootHttp();

export function fetchSingleEmployee(id){
    return dispatch => {
        http.fetchById("employee", id)
            .then((employee) => {
                    dispatch(setSingleEmployee(employee));
                }
            )
    }
    
}
//Gets specific employee by name

export function fetchEmployees(){
    return dispatch => {

        http.fetchAll("employee/byUser")
            .then((employees) => {
                    dispatch(setEmployees(employees));
                }
            )
    }
}
//Gets all employees

export function fetchEmployeesByDepartment(department){
    return dispatch => {
        http.fetchAll("employee/byDepartment/" + department)
            .then((employees) => {
                    dispatch(setEmployees(employees));
                }
            )
    }
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

export function addEmployee(employee){
    http.addItem("employee", employee);

    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE,
        payload: employee
    }
}
//Posts new employee to API

export function updateEmployee(employee, id){
    http.updateItemById("employee", employee, id);

    return {
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        payload: employee
    }
}
//Updates function for employee

export function deleteEmployee(id){
    http.deleteItemById("employee", id);

    return {
        type: EmployeeActionTypes.DELETE_EMPLOYEE,
        payload: id
    }
}
//Deletes selected employee