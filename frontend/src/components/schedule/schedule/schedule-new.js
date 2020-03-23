import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import ScheduleForm from './schedule-form';

const ScheduleNew = (props) =>{
    return(
        <div>
            {props.addMode ?
                <div>
                    <div className='middle size-holder grid50'>
                        <div>
                        </div>
                        <div className="right-top">
                            <CustomButton label="Show Full Day" buttonStyle="blue"/>
                        </div>
                    </div>
                    <div className='border'>
                        <ScheduleForm 
                            callback={props.action} 
                            objectives={props.objectives}
                            employeeMap={props.employeeMap}
                            employeeId={props.employeeId}
                            year={props.year}
                            month={props.month}
                            day={props.day}
                            editMode={false}
                            hasNeededData={props.hasNeededData} />
                    </div>
                </div>
            :
                <div className='middle size-holder grid50'>
                    <div className='left-top'>
                        <CustomButton 
                            buttonStyle="blue"
                            label="Add Schedules Task"
                            action={props.action} 
                            />
                    </div>
                    <div className="right-top">
                        <CustomButton label="Show Full Day" buttonStyle="blue"/>
                    </div>
                </div>
            }
        </div>
    )
}

export default ScheduleNew;