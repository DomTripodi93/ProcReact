import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStepsByDepartmentAndObjective } from '../../reducers/process/step/step.actions';
import StepNew from '../../components/process/step/step-new';
import Steps from '../../components/process/step/steps';

import './process.styles.scss';


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
            <h3 className='centered'>Steps</h3>
            <div className="grid100">
                <StepNew
                    deptName={deptName}
                    objectiveName={objectiveName}
                    addMode={addMode}
                    action={showStepForm}/>
            </div>
            <br />
            {props.steps ?
                <Steps 
                    deptName={deptName}
                    objectiveName={objectiveName}
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