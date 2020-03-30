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
            return {
                ...state,
                steps: [...state.steps, action.payload]
            };
        case StepActionTypes.UPDATE_STEPS:
            return {
                ...state,
                steps: [
                    action.payload,
                    ...state.steps
                        .filter((value)=>{
                            return value.stepNumber !== action.payload.stepNumber 
                        })]
                        .sort((first, second)=>{
                            if(first.stepNumber > second.stepNumber){
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
                        return value.stepNumber !== action.payload
                    })]
            };
        default:
            return state;
    }
}

export default stepReducer;


// switch (action.type) {
//     case ObjectiveActionTypes.SET_SINGLE_OBJECTIVE:
//         return {
//             ...state,
//             selectedObjective: action.payload
//         };
//     case ObjectiveActionTypes.SET_OBJECTIVES:
//         if (action.payload.data.length > 0){
//             objectiveHold[action.deptName] = action.payload.data;
//         } else {
//             objectiveHold[action.deptName] = [];
//         }
//         return {
//             ...state,
//             objectives: objectiveHold,
//             called: true
//         };
//     case ObjectiveActionTypes.ADD_OBJECTIVE:
//         objectiveHold[action.payload.deptName].push(action.payload)
//         return {
//             ...state,
//             objectives: objectiveHold
//         };
//     case ObjectiveActionTypes.UPDATE_OBJECTIVES:
//         objectiveHold[action.payload.deptName] = objectiveHold[action.payload.deptName]
//             .filter((value)=>{
//                 return value.objectiveName !== action.payload.objectiveName 
//             })
//         objectiveHold[action.payload.deptName].push(action.payload)
//         objectiveHold[action.payload.deptName] = objectiveHold[action.payload.deptName]
//             .sort((first, second)=>{
//                 if(first.objectiveName > second.objectiveName){
//                     return 1
//                 } else {
//                     return -1
//                 }}
//             )
//         return {
//             ...state,
//             objectives: objectiveHold
//         };
//     case ObjectiveActionTypes.DELETE_OBJECTIVE:
//         objectiveHold[action.deptName] = objectiveHold[action.deptName]
//             .filter((value)=>{
//                 return value.objectiveName !== action.payload
//             })
//         return {
//             ...state,
//             objectives: objectiveHold
//         };
//     default:
//         return state;
// }