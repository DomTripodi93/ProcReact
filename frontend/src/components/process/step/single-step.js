import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import StepForm from './step-form';
import { deleteStep } from '../../../reducers/process/step/step.actions';
import { connect } from 'react-redux';
import StepContainer from '../../../containers/process/step-container';
import { Link } from 'react-router-dom';



const SingleStep = props =>{
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
          "Are you sure you want to delete this step: " + props.step.stepNumber + "?"
          )){
            props.deleteStep(props.step.stepNumber, props.deptName);
        }
    }

    return(
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.step.stepNumber}: {props.step.name}</h3>
                        {props.step.goal ?
                            <h4>Goal: {props.step.goal}</h4>
                        :
                            null
                        }
                        {props.step.time ?
                            <h4>Time: {props.step.time} Hours</h4>
                        :
                            null
                        }
                        <div className="grid50">
                            <CustomButton 
                                action={setEditMode} 
                                buttonStyle="blue" 
                                label="Edit" />
                            <CustomButton 
                                action={handleDelete} 
                                buttonStyle="red" 
                                label="Delete" />
                        </div>
                    </div>
                :
                    <StepForm 
                        deptName={props.LinkdeptName} 
                        editMode={true}
                        inDept={props.inDept}
                        stepInput={props.step} 
                        callback={setEditMode} />
                }
            </div>
            <br />
            {!props.inDept ?
                <StepContainer stepNumber={props.step.stepNumber} deptName={props.deptName} />
            :
                <Link to={'step/' + props.deptName + '/' + props.objectiveName + '/' + props.step.stepNumber} className='grid100 spaced'>
                    <CustomButton 
                        buttonStyle='green' 
                        label="View Step" />
                </Link>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteStep: (stepNumber, objectiveName, deptName) => dispatch(deleteStep(stepNumber, objectiveName, deptName))
    }
}

export default connect(null, mapDispatchToProps)(SingleStep);