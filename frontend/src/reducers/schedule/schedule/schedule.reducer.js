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
                scheduledTasksCalled: action.setFor
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
                    .sort((first, second)=>{ 
                        if (first.date > second.date){
                            return 1;
                        } else {
                            return -1;
                        }
                    })
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
                            if (first.date > second.date){
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
        case ScheduleActionTypes.SIGNOUT_USER:
            return {
                scheduledTasks: [],
                scheduledTasksCalled: false
            }
        default:
            return state;
    }
}

export default scheduleReducer;