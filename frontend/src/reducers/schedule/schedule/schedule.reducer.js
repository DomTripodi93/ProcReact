import ScheduleActionTypes from './schedule.types';

const INITIAL_STATE = {
    schedules: []
}

const scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULES:
            return {
                ...state,
                schedules: action.payload.data
            };
        case ScheduleActionTypes.ADD_SCHEDULE:
            return {
                ...state,
                schedules: [...state.schedules, action.payload]
            };
        case ScheduleActionTypes.UPDATE_SCHEDULES:
            return {
                ...state,
                schedules: [
                    action.payload,
                    ...state.schedules
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
                schedules: [...state.schedules
                    .filter((value)=>{
                        return value.id !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default scheduleReducer;