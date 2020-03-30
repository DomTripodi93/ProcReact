import StepActionTypes from './step.types';

const INITIAL_STATE = {
    steps: {},
    selectedStep: {},
}

const stepReducer = (state = INITIAL_STATE, action) => {
    let stepsHold = {...state.steps}
    switch (action.type) {
        case StepActionTypes.SET_SINGLE_STEP:
            return {
                ...state,
                selectedStep: action.payload
            };
        case StepActionTypes.SET_STEPS:
            stepsHold[action.deptName] = {};
            if (action.payload.data.length > 0){
                stepsHold[action.deptName][action.objectiveName] = action.payload.data;
            } else {
                stepsHold[action.deptName][action.objectiveName] = [];
            }
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.ADD_STEP:
            stepsHold[action.payload.deptName][action.payload.objectiveName] = [
                action.payload,
                ...stepsHold[action.payload.deptName][action.payload.objectiveName]
            ].sort((first, second)=>{
                if(first.stepNumber > second.stepNumber){
                    return 1;
                } else {
                    return -1;
                }}
            );
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.UPDATE_STEPS:
            stepsHold[action.payload.deptName][action.payload.objectiveName] = [
                action.payload,
                ...stepsHold[action.payload.deptName][action.payload.objectiveName]
                    .filter((value)=>{
                        return value.stepNumber !== action.payload.stepNumber;
                    })]
                    .sort((first, second)=>{
                        if(first.stepNumber > second.stepNumber){
                            return 1;
                        } else {
                            return -1;
                        }}
                    );
            return {
                ...state,
                steps: stepsHold
            };
        case StepActionTypes.DELETE_STEP:
            stepsHold[action.payload.deptName][action.payload.objectiveName] = [
                ...stepsHold[action.payload.deptName][action.payload.objectiveName]
                    .filter((value)=>{
                        return value.stepNumber !== action.payload;
                    })]
            return {
                ...state,
                steps: stepsHold
            };
        default:
            return state;
    }
}

export default stepReducer;