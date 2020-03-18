import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStepsByDepartmentAndObjective } from '../../reducers/process/step/step.actions';
import StepNew from '../../components/process/step/step-new';
import Steps from '../../components/process/step/steps';


const StepContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchSteps = props.fetchSteps;
    const deptName = props.deptName;
    const objectiveName = props.objectiveName;

    useEffect(()=>{
        if (
            deptName !== undefined && 
            objectiveName !== undefined && 
            deptName !== ""
        ){
            fetchSteps(deptName, objectiveName);
        }
    },[fetchSteps, deptName, objectiveName]);


    const showStepForm = () =>{
        setAddMode(!addMode)
    }

    return(
        <div>
            <div className="grid100">
                <StepNew
                    deptName={deptName}
                    addMode={addMode}
                    action={showStepForm}/>
            </div>
            {props.steps ?
                <Steps 
                    deptName={deptName}
                    action={showStepForm} 
                    steps={props.steps}/>
            :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchSteps: (deptName, objectiveName) => dispatch(fetchStepsByDepartmentAndObjective(deptName, objectiveName))
    }
}

const mapStateToProps = state => ({
    steps: state.step.steps
});

export default connect(mapStateToProps, mapDispatchToProps)(StepContainer);