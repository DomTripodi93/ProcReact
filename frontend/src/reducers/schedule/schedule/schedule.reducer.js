import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: {}
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    let taskHold = state.scheduledTasks;
    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULES:
            taskHold[action.date] = action.payload.data; 
            return {
                ...state,
                scheduledTasks: action.payload.data
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            taskHold[action.date].push(action.payload)
            taskHold[action.date] = taskHold[action.date]
                .sort((first, second)=>{ 
                    if (first.date > second.date){
                        return 1;
                    } else {
                        return -1;
                    }
                });
            return {
                scheduledTasks: taskHold
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            taskHold[action.date].push(action.payload)
            taskHold[action.date] = taskHold[action.date]
                .filter((value)=>{
                    return value.id !== action.payload.id 
                })
                .sort((first, second)=>{
                    if (first.date > second.date){
                        return 1
                    } else {
                        return -1
                    }}
                )
            return {
                scheduledTasks: taskHold
            };
        case ScheduleActionTypes.DELETE_SCHEDULE:
            taskHold[action.date] = taskHold[action.date]
                .filter((value)=>{
                    return value.id !== action.payload
                })
            return {
                scheduledTasks: taskHold
            };
        case ScheduleActionTypes.SIGNOUT_USER:
            return {
                scheduledTasks: {}
            }
        default:
            return state;
    }
}

export default scheduleReducer;