import rootHttp from '../../root-http';
import DepartmentActionTypes from './department.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();

export function fetchSingleDepartment(id){
    return dispatch => {
        http.fetchById("department", id)
            .then((department) => {
                dispatch(setSingleDepartment(department));
            });
    }  
}
//Gets specific department by name

export function fetchDepartments(){
    return dispatch => {
        http.fetchAll("department/byUser")
            .then((departments) => {
                dispatch(setDepartments(departments));
            });
    }
}
//Gets all departments

export function addDepartment(department, callback){
    department = prepDepartmentValues(department);
    return dispatch =>{
        http.addItem("department", department)
            .then(addedDepartment =>{
                dispatch(addDepartmentToState(addedDepartment.data));
                callback();
            });
    }
}
//Posts new department to API

export function updateDepartment(department, callback){
    department = prepDepartmentValues(department);
    return dispatch =>{
        http.updateItemById("department", department, department.deptName)
            .then(() =>{
                dispatch(updateDepartmentInState(department));
                callback();
            });
    }
}
//Updates department in database

export function deleteDepartment(id){
    return dispatch =>{
        http.deleteItemById("department", id)
            .then(()=>{
                dispatch(deleteDepartmentFromState(id));
            });
    }
}
//Deletes selected department

export function addDepartmentToState(department){
    return {
        type: DepartmentActionTypes.ADD_DEPARTMENT,
        payload: department
    }
}
//Adds new department from post to state

export function setDepartments(departments){
    return {
        type: DepartmentActionTypes.SET_DEPARTMENTS,
        payload: departments
    }
}
//Sets all departments in state

export function setSingleDepartment(department){
    return {
        type: DepartmentActionTypes.SET_SINGLE_DEPARTMENT,
        payload: department
    }
}
//Sets selected department in state

export function updateDepartmentInState(department){
    return {
        type: DepartmentActionTypes.UPDATE_DEPARTMENT,
        payload: department
    }
}
//Updates function for department

export function deleteDepartmentFromState(id){
    return {
        type: DepartmentActionTypes.DELETE_DEPARTMENT,
        payload: id
    }
}
//Deletes selected department

function prepDepartmentValues(department){
    department.deptName = helper.capitalizeAll(department.deptName);
    if (department.funcName){
        department.funcName = helper.capitalize(department.funcName);
    }

    return department;
}