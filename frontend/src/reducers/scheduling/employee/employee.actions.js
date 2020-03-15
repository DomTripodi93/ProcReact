import rootHttp from '../../root-http';
import EmployeeActionTypes from './employee.types';


const http = new rootHttp();

export function fetchSingleEmployee(id){
    return dispatch => {
        http.fetchById("employee", id)
            .then((employee) => {
                dispatch(setSingleEmployee(employee));
            });
    }
    
}
//Gets specific employee by name

export function fetchEmployees(){
    return dispatch => {
        http.fetchAll("employee/byUser")
            .then((employees) => {
                dispatch(setEmployees(employees));
            });
    }
}
//Gets all employees

export function fetchEmployeesByDepartment(department){
    return dispatch => {
        http.fetchAll("employee/byDepartment/" + department)
            .then((employees) => {
                dispatch(setEmployees(employees));
            });
    }
}
//Gets all employees for a department

export function addEmployee(employee, callback){
    return dispatch =>{
        http.addItem("employee", employee)
            .then(addedEmployee =>{
                dispatch(addEmployeeToState(addedEmployee.data));
                callback();
            });
    }
}
//Posts new employee to API

export function updateEmployee(employee, callback){
    return dispatch =>{
        http.updateItemById("employee", employee, employee.employeeId)
            .then(() =>{
                dispatch(updateEmployeeInState(employee));
                callback();
            });
    }
}
//Updates employee in database

export function deleteEmployee(id, callback){
    return dispatch =>{
        http.deleteItemById("employee", id)
            .then(()=>{
                dispatch(deleteEmployeeInState(id));
                callback();
            });
    }
}
//Deletes selected employee

export function addEmployeeToState(employee){
    return {
        type: EmployeeActionTypes.ADD_EMPLOYEE,
        payload: employee
    }
}
//Adds new employee from post to state

export function setEmployees(employees){
    return {
        type: EmployeeActionTypes.SET_EMPLOYEES,
        payload: employees
    }
}
//Sets all employees in state

export function setSingleEmployee(employee){
    return {
        type: EmployeeActionTypes.SET_SINGLE_EMPLOYEE,
        payload: employee
    }
}
//Sets selected employee in state

export function updateEmployeeInState(employee){
    return {
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        payload: employee
    }
}
//Updates function for employee

export function deleteEmployeeInState(id){
    return {
        type: EmployeeActionTypes.DELETE_EMPLOYEE,
        payload: id
    }
}
//Deletes selected employee