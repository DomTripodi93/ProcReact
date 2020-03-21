import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    scheduledTasks: [],
    scheduledTasksCalled: false
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULES:
            return {
                ...state,
                scheduledTasks: action.payload.data,
                scheduledTasksCalled: true
            };
        case ScheduleActionTypes.RESET_SCHEDULES:
            return {
                ...state,
                scheduledTasks: [],
                scheduledTasksCalled: false
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            return {
                ...state,
                scheduledTasks: [...state.scheduledTasks, action.payload]
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            return {
                ...state,
                scheduledTasks: [
                    action.payload,
                    ...state.scheduledTasks
                        .filter((value)=>{
                            return value.id !== action.payload.id 
                        })]
                        .sort((first, second)=>{
                            if(first.id > second.id){
                                return 1
                            } else {
                                return -1
                            }}
                        )
            };
        case ScheduleActionTypes.DELETE_SCHEDULE:
            return {
                ...state,
                scheduledTasks: [...state.scheduledTasks
                    .filter((value)=>{
                        return value.id !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default scheduleReducer;