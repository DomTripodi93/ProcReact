import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const EmployeeNew = (props) =>{
    return(
        <div>
            {props.addMode ?
                <div>addMode</div>
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