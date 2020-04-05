import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: {},
    selectedScheduledTasks: []
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    let taskHold = state.scheduledTasks;
    let selectedHold = state.selectedScheduledTasks;
    const filterTasks = (taskArray, id) =>{
        return taskArray.filter((value)=>{
            return value.id !== id 
        })
    }
    const sortTasks = (taskArray) =>{
        return taskArray.sort((first, second)=>{ 
            if (first.date > second.date){
                return 1;
            } else {
                return -1;
            }
        });
    }
    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULES:
            taskHold[action.date] = action.payload.data;
            selectedHold = taskHold[action.date];
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SELECT_SCHEDULES:
            selectedHold = taskHold[action.payload];
            return {
                ...state,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            taskHold[action.date].push(action.payload);
            taskHold[action.date] = sortTasks(taskHold[action.date])
            selectedHold = taskHold[action.date]
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            taskHold[action.date].push(action.payload)
            taskHold[action.date] = sortTasks(filterTasks(taskHold[action.date], action.payload.id));
            selectedHold = taskHold[action.date]
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.DELETE_SCHEDULE:
            taskHold[action.date] = filterTasks(taskHold[action.date], action.payload.id);
            selectedHold = taskHold[action.date]
            return {
                scheduledTasks: taskHold,
                selectedScheduledTasks: selectedHold
            };
        case ScheduleActionTypes.SIGNOUT_USER:
            return {
                scheduledTasks: {},
                selectedScheduledTasks: []
            }
        default:
            return state;
    }
}

export default scheduleReducer;