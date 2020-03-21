import ScheduledTaskActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: [],
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ScheduledTaskActionTypes.SET_SCHEDULED_TASKS:
            return {
                ...state,
                schedules: action.payload.data
            };
        case ScheduledTaskActionTypes.ADD_SCHEDULED_TASK:
            return {
                ...state,
                schedules: [...state.schedules, action.payload]
            };
        case ScheduledTaskActionTypes.UPDATE_SCHEDULED_TASK:
            return {
                ...state,
                schedules: [
                    action.payload,
                    ...state.schedules
                        .filter((value)=>{
                            return value.scheduleId !== action.payload.scheduleId 
                        })]
                        .sort((first, second)=>{
                            if(first.scheduleId > second.scheduleId){
                                return 1
                            } else {
                                return -1
                            }}
                        )
            };
        case ScheduledTaskActionTypes.DELETE_SCHEDULED_TASK:
            return {
                ...state,
                schedules: [...state.schedules
                    .filter((value)=>{
                        return value.scheduleId !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default scheduleReducer;