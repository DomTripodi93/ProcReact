import rootHttp from '../../root-http';
import ObjectiveActionTypes from './objective.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();

export function fetchSingleObjective(objectiveName, deptName){
    return dispatch => {
        http.fetchByValue("objective", deptName + "&" + objectiveName)
            .then((objective) => {
                dispatch(setSingleObjective(objective));
            });
    }  
}
//Gets specific objective by name

export function fetchObjectivesByDepartment(deptName){
    return dispatch => {
        http.fetchAll("objective/byDepartment/"+deptName)
            .then((objectives) => {
                dispatch(setObjectives(objectives));
            });
    }
}
//Gets all objectives for a specific department

export function addObjective(objective, callback){
    objective = prepObjectiveValues(objective);
    return dispatch =>{
        http.addItem("objective", objective)
            .then(addedObjective =>{
                dispatch(addObjectiveToState(addedObjective.data));
                callback();
            });
    }
}
//Posts new objective to API

export function updateObjective(objective, callback){
    objective = prepObjectiveValues(objective);
    return dispatch =>{
        http.updateItemById("objective", objective, objective.objectiveName)
            .then(() =>{
                dispatch(updateObjectiveInState(objective));
                callback();
            });
    }
}
//Updates objective in database

export function deleteObjective(id){
    return dispatch =>{
        http.deleteItemById("objective", id)
            .then(()=>{
                dispatch(deleteObjectiveFromState(id));
            });
    }
}
//Deletes selected objective

export function addObjectiveToState(objective){
    return {
        type: ObjectiveActionTypes.ADD_OBJECTIVE,
        payload: objective
    }
}
//Adds new objective from post to state

export function setObjectives(objectives){
    return {
        type: ObjectiveActionTypes.SET_OBJECTIVES,
        payload: objectives
    }
}
//Sets all objectives in state

export function setSingleObjective(objective){
    return {
        type: ObjectiveActionTypes.SET_SINGLE_OBJECTIVE,
        payload: objective
    }
}
//Sets selected objective in state

export function updateObjectiveInState(objective){
    return {
        type: ObjectiveActionTypes.UPDATE_OBJECTIVE,
        payload: objective
    }
}
//Updates function for objective

export function deleteObjectiveFromState(id){
    return {
        type: ObjectiveActionTypes.DELETE_OBJECTIVE,
        payload: id
    }
}
//Deletes selected objective

function prepObjectiveValues(objective){
    objective.objectiveName = helper.capitalizeAll(objective.objectiveName);
    if (objective.funcName){
        objective.funcName = helper.capitalize(objective.funcName);
    }

    return objective;
}