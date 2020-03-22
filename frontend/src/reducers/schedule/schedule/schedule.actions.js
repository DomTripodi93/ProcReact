import rootHttp from '../../root-http';
import ScheduleActionTypes from './schedule.types';
import helpers from '../../../shared/helpers';


const http = new rootHttp();
const helper = new helpers();

export function fetchSchedulesByDate(month, day, year){
    return dispatch => {
        http.fetchAll("schedule/byUser/" + month + "&" + year + "&" + day)
            .then((schedules) => {
                dispatch(setSchedules(schedules));
            });
    }
}
//Gets all schedules for a specific day

export function fetchSchedulesByEmployee(employeeId, month, day, year){
    return dispatch => {
        http.fetchAll("schedule/byEmployee/" + employeeId + "&" + month + "&" + year + "&" + day)
            .then((schedules) => {
                dispatch(setSchedules(schedules));
            });
    }
}
//Gets all schedules for a specific day

export function addScheduledTask(schedule, callback){
    return dispatch =>{
        http.addItem("schedule", schedule)
            .then(addedSchedule =>{
                dispatch(addScheduleToState(addedSchedule.data));
                callback();
            });
    }
}
//Posts new schedule to API

export function updateScheduledTask(schedule, callback){
    return dispatch =>{
        http.updateItemById("schedule", schedule, schedule.id)
            .then(() =>{
                dispatch(updateSchedulesInState(schedule));
                callback();
            });
    }
}
//Updates schedule in database

export function deleteSchedule(id){
    return dispatch =>{
        http.deleteItemById("schedule", id)
            .then(()=>{
                dispatch(deleteScheduleFromState(id));
            });
    }
}
//Deletes selected schedule

export function addScheduleToState(schedule){
    return {
        type: ScheduleActionTypes.ADD_SCHEDULE,
        payload: schedule
    }
}
//Adds new schedule from post to state

export function setSchedules(schedules){
    return {
        type: ScheduleActionTypes.SET_SCHEDULES,
        payload: schedules
    }
}
//Sets all schedules in state

export function updateSchedulesInState(schedule){
    return {
        type: ScheduleActionTypes.UPDATE_SCHEDULES,
        payload: schedule
    }
}
//Updates function for schedule

export function deleteScheduleFromState(id){
    return {
        type: ScheduleActionTypes.DELETE_SCHEDULE,
        payload: id
    }
}
//Deletes selected schedule

export function resetSchedules(){
    return {
        type: ScheduleActionTypes.RESET_SCHEDULES
    }
}