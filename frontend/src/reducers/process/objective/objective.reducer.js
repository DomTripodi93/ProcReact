import ObjectiveActionTypes from './objective.types';

const INITIAL_STATE = {
    objectives: {},
    selectedObjective: {}
}

const objectiveReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ObjectiveActionTypes.SET_SINGLE_OBJECTIVE:
            return {
                ...state,
                selectedObjective: action.payload
            };
        case ObjectiveActionTypes.SET_OBJECTIVES:
            let objectiveHold = { ...state.objectives };
            if (action.payload.data.length > 0){
                objectiveHold[action.deptName] = action.payload.data;
            } else {
                objectiveHold[action.deptName] = [];
            }
            return {
                ...state,
                objectives: objectiveHold
            };
        case ObjectiveActionTypes.ADD_OBJECTIVE:
            return {
                ...state,
                objectives: [...state.objectives, action.payload]
            };
        case ObjectiveActionTypes.UPDATE_OBJECTIVE:
            return {
                ...state,
                objectives: [
                    action.payload,
                    ...state.objectives
                        .filter((value)=>{
                            return value.objectiveName !== action.payload.objectiveName 
                        })]
                        .sort((first, second)=>{
                            if(first.objectiveName > second.objectiveName){
                                return 1
                            } else {
                                return -1
                            }}
                        )
            };
        case ObjectiveActionTypes.DELETE_OBJECTIVE:
            return {
                ...state,
                objectives: [...state.objectives
                    .filter((value)=>{
                        return value.objectiveName !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default objectiveReducer;