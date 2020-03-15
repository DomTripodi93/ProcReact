import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';


const SingleEmployee = props =>{
    const [editMode, updateEditMode] = useState(false)

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const viewSchedule = () => {
        props.history.push('/' + props.employee.employeeId);
    }

    return(
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.employee.employeeId}: {props.employee.name}</h3>
                        <h4>Title: {props.employee.title}</h4>
                        {props.employee.deptName ?
                            <h4>Department: {props.employee.deptName}</h4>
                        :
                            null
                        }
                        <div className="grid50">
                            <CustomButton action={setEditMode} buttonStyle="blue" label="Edit" />
                            <CustomButton action={setEditMode} buttonStyle="red" label="Delete" />
                        </div>
                    </div>
                :
                    <div>editMode</div>
                }
            </div>
            {!props.inFull ?
                <div className='size-holder grid100 middle'>
                    <CustomButton buttonStyle='green' label="View Schedule" action={viewSchedule} />
                </div>
            :
                null
            }
        </div>
    )
}

export default SingleEmployee;