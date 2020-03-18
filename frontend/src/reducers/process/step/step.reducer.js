import StepActionTypes from './step.types';

const INITIAL_STATE = {
    steps: [],
    selectedStep: {},
}

const stepReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StepActionTypes.SET_SINGLE_STEP:
            return {
                ...state,
                selectedStep: action.payload
            };
        case StepActionTypes.SET_STEPS:
            return {
                ...state,
                steps: action.payload.data
            };
        case StepActionTypes.ADD_STEP:
            return {
                ...state,
                steps: [...state.steps, action.payload]
            };
        case StepActionTypes.UPDATE_STEP:
            return {
                ...state,
                steps: [
                    action.payload,
                    ...state.steps
                        .filter((value)=>{
                            return value.deptName !== action.payload.deptName 
                        })]
                        .sort((first, second)=>{
                            if(first.deptName > second.deptName){
                                return 1
                            } else {
                                return -1
                            }}
                        )
            };
        case StepActionTypes.DELETE_STEP:
            return {
                ...state,
                steps: [...state.steps
                    .filter((value)=>{
                        return value.deptName !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default stepReducer;