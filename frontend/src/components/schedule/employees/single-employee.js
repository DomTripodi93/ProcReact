import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import { Redirect, Link } from 'react-router-dom';


const SingleEmployee = props =>{
    const [editMode, updateEditMode] = useState(false)

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    return(
        <div>
            <div className='border centered'>
                {!editMode ?
                    <div>
                        <h3>{props.employee.employeeId}: {props.employee.name}</h3>
                        {props.employee.title ?
                            <h4>Title: {props.employee.title}</h4>
                        :
                            null
                        }
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
                <Link to={'schedule/' + props.employee.employeeId} className='grid100 spaced'>
                    <CustomButton 
                        buttonStyle='green' 
                        label="View Schedule" />
                </Link>
            :
                null
            }
        </div>
    )
}

export default SingleEmployee;