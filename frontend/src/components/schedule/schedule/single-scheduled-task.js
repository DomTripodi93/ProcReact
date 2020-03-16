import React, { useState } from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import { Link } from 'react-router-dom';
import EmployeeForm from './schedule-form';
import { deleteEmployee } from '../../../reducers/schedule/employee/employee.actions';
import { connect } from 'react-redux';


const SingleEmployee = props =>{
    const [editMode, updateEditMode] = useState(false)

    const setEditMode = () => {
        updateEditMode(!editMode)
    }

    const handleDelete = () => {
        if (window.confirm(
          "Are you sure you want to delete this employee: " +props.employee.name+ "?"
          )){
            props.deleteEmployee(props.employee.employeeId);
        }
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
                            <CustomButton action={handleDelete} buttonStyle="red" label="Delete" />
                        </div>
                    </div>
                :
                    <EmployeeForm editMode={true} employeeInput={props.employee} callback={setEditMode} />
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

const mapDispatchToProps = dispatch => {
    return {
        deleteEmployee: (id) => dispatch(deleteEmployee(id))
    }
}


export default connect(null, mapDispatchToProps)(SingleEmployee);