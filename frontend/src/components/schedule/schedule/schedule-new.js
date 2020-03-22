import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleForm from './schedule-form';

const ScheduleNew = (props) =>{
    return(
        <div>
            {props.addMode ?
                <div className='border'>
                    <ScheduleForm 
                        callback={props.action} 
                        objectives={props.objectives}
                        employeeMap={props.employeeMap}
                        employeeId={props.employeeId}
                        year={props.year}
                        month={props.month}
                        day={props.day}
                        editMode={false}/>
                </div>
            :
                <div className='top'>
                    <CustomButton 
                        buttonStyle="blue"
                        label="Add Schedules Task"
                        action={props.action} 
                        />
                </div>
            }
        </div>
    )
}

export default ScheduleNew;