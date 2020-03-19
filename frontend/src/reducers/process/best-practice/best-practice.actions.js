import rootHttp from '../../root-http';
import BestPracticeActionTypes from './best-practice.types';
import helpers from '../../../shared/helpers';
import store from '../../store';


const http = new rootHttp();
const helper = new helpers();

export function fetchSingleBestPractice(id){
    return dispatch => {
        http.fetchById(id)
            .then((bestPractice) => {
                dispatch(setSingleBestPractice(bestPractice.data));
            });
    }  
}
//Gets specific bestPractice by name

export function fetchBestPracticesByStep(deptName, objectiveName, stepNumber){
    return dispatch => {
        http.fetchAll("bestPractice/byStep/" + deptName + "&" + objectiveName + "&" + stepNumber)
            .then((bestPractices) => {
                dispatch(setBestPractices(bestPractices));
            });
    }
}
//Gets all bestPractices for a specific department

export function addBestPractice(bestPractice, callback){
    bestPractice = prepBestPracticeValues(bestPractice);
    return dispatch =>{
        http.addItem("bestPractice", bestPractice)
            .then(addedBestPractice =>{
                dispatch(addBestPracticeToState(addedBestPractice.data));
                callback();
            });
    }
}
//Posts new bestPractice to API

export function updateBestPractice(bestPractice, callback){
    bestPractice = prepBestPracticeValues(bestPractice);
    return dispatch =>{
        http.updateItemById("bestPractice", bestPractice, bestPractice.id)
            .then(() =>{
                dispatch(updateBestPracticesInState(bestPractice));
                callback();
            });
    }
}
//Updates bestPractice in database

export function updateSingleBestPractice(bestPractice, callback){
    bestPractice = prepBestPracticeValues(bestPractice);
    return dispatch =>{
        http.updateItemById("bestPractice", bestPractice, bestPractice.id)
            .then(() =>{
                if (Object.keys(store.getState().bestPractice.bestPractices).length > 0){
                    dispatch(updateBestPracticesInState(bestPractice));
                }
                dispatch(setSingleBestPractice(bestPractice));
                callback();
            });
    }
}
//Updates objective in database

export function deleteBestPractice(id){
    return dispatch =>{
        http.deleteItemById("bestPractice", id)
            .then(()=>{
                dispatch(deleteBestPracticeFromState(id));
            });
    }
}
//Deletes selected bestPractice

export function addBestPracticeToState(bestPractice){
    return {
        type: BestPracticeActionTypes.ADD_BEST_PRACTICE,
        payload: bestPractice
    }
}
//Adds new bestPractice from post to state

export function setBestPractices(bestPractices){
    return {
        type: BestPracticeActionTypes.SET_BEST_PRACTICES,
        payload: bestPractices
    }
}
//Sets all bestPractices in state

export function setSingleBestPractice(bestPractice){
    return {
        type: BestPracticeActionTypes.SET_SINGLE_BEST_PRACTICE,
        payload: bestPractice
    }
}
//Sets selected bestPractice in state

export function updateBestPracticesInState(bestPractice){
    return {
        type: BestPracticeActionTypes.UPDATE_BEST_PRACTICES,
        payload: bestPractice
    }
}
//Updates function for bestPractice

export function deleteBestPracticeFromState(id){
    return {
        type: BestPracticeActionTypes.DELETE_BEST_PRACTICE,
        payload: id
    }
}
//Deletes selected bestPractice

function prepBestPracticeValues(bestPractice){
    bestPractice.difficulty = helper.capitalizeAll(bestPractice.difficulty);
    if (bestPractice.cause){
        bestPractice.cause = helper.capitalize(bestPractice.cause);
    }
    if (bestPractice.solution){
        bestPractice.solution = helper.capitalize(bestPractice.solution);
    }

    return bestPractice;
}