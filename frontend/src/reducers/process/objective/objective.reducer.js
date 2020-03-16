import ObjectiveActionTypes from './objective.types';

const INITIAL_STATE = {
    objectives: [],
    selectedObjective: {},
}

const objectiveReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ObjectiveActionTypes.SET_SINGLE_OBJECTIVE:
            return {
                ...state,
                selectedObjective: action.payload
            };
        case ObjectiveActionTypes.SET_OBJECTIVES:
            return {
                ...state,
                objectives: action.payload.data
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