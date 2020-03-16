import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import EmployeeForm from './schedule-form';

const EmployeeNew = (props) =>{
    return(
        <div>
            {props.addMode ?
                <div className='border'>
                    <EmployeeForm 
                        callback={props.action} 
                        editMode={false}/>
                </div>
            :
                <div className='top'>
                    <CustomButton 
                        buttonStyle="blue"
                        label="Add Employee"
                        action={props.action} 
                        />
                </div>
            }
        </div>
    )
}

export default EmployeeNew;