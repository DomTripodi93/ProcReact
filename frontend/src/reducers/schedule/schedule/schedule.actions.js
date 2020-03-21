import rootHttp from '../../root-http';
import ScheduledTaskActionTypes from './schedule.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();

export function fetchScheduledTasks(){
    return dispatch => {
        http.fetchAll("schedule/byUser")
            .then((schedules) => {
                dispatch(setScheduledTasks(schedules));
            });
    }
}
//Gets all schedules

export function fetchScheduledTasksByDepartment(department){
    return dispatch => {
        http.fetchAll("schedule/byDepartment/" + department)
            .then((schedules) => {
                dispatch(setScheduledTasks(schedules));
            });
    }
}
//Gets all schedules for a department

export function addScheduledTask(schedule, callback){
    schedule = prepScheduledTaskValues(schedule);
    return dispatch =>{
        http.addItem("schedule", schedule)
            .then(addedScheduledTask =>{
                dispatch(addScheduledTaskToState(addedScheduledTask.data));
                callback();
            });
    }
}
//Posts new schedule to API

export function updateScheduledTask(schedule, callback){
    schedule = prepScheduledTaskValues(schedule);
    return dispatch =>{
        http.updateItemById("schedule", schedule, schedule.scheduleId)
            .then(() =>{
                dispatch(updateScheduledTaskInState(schedule));
                callback();
            });
    }
}
//Updates schedule in database

export function deleteScheduledTask(id){
    return dispatch =>{
        http.deleteItemById("schedule", id)
            .then(()=>{
                dispatch(deleteScheduledTaskFromState(id));
            });
    }
}
//Deletes selected schedule

export function addScheduledTaskToState(schedule){
    return {
        type: ScheduledTaskActionTypes.ADD_SCHEDULED_TASK,
        payload: schedule
    }
}
//Adds new schedule from post to state

export function setScheduledTasks(schedules){
    return {
        type: ScheduledTaskActionTypes.SET_SCHEDULED_TASKS,
        payload: schedules
    }
}
//Sets all schedules in state

export function updateScheduledTaskInState(schedule){
    return {
        type: ScheduledTaskActionTypes.UPDATE_SCHEDULED_TASK,
        payload: schedule
    }
}
//Updates function for schedule

export function deleteScheduledTaskFromState(id){
    return {
        type: ScheduledTaskActionTypes.DELETE_SCHEDULED_TASK,
        payload: id
    }
}
//Deletes selected schedule

function prepScheduledTaskValues(schedule){
    schedule.name = helper.capitalizeAll(schedule.name);
    if (schedule.title){
        schedule.title = helper.capitalizeAll(schedule.title);
    }

    return schedule;
}