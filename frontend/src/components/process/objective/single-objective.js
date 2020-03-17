import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ObjectiveForm from './objective-form';
import { deleteObjective } from '../../../reducers/process/objective/objective.actions';
import { connect } from 'react-redux';
import StepContainer from '../../../containers/process/step-container';



const SingleObjective = props =>{
    const [editMode, updateEditMode] = useState(false);

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
          "Are you sure you want to delete this objective: " +props.objective.objectiveName+ "?"
          )){
            props.deleteObjective(props.objective.objectiveName);
        }
    }

    return(
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.objective.objectiveName}</h3>
                        {props.objective.funcName ?
                            <h4>Function: {props.objective.funcName}</h4>
                        :
                            null
                        }
                        <div className="grid50">
                            <CustomButton action={setEditMode} buttonStyle="blue" label="Edit" />
                            <CustomButton action={handleDelete} buttonStyle="red" label="Delete" />
                        </div>
                    </div>
                :
                    <ObjectiveForm editMode={true} objectiveInput={props.objective} callback={setEditMode} />
                }
            </div>
            <br />
            <StepContainer objectiveName={props.objective.objectiveName} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteObjective: (id) => dispatch(deleteObjective(id))
    }
}

export default connect(null, mapDispatchToProps)(SingleObjective);