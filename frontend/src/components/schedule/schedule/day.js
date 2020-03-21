import React from 'react';
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';

const Days = props => {
    return(
        <div>
            <div className="grid50">
                <div className="middle">
                    <CustomButton 
                        label="< Previous Day"
                        buttonStyle="blue"
                        action={()=>props.callback('last')}/>
                </div>
                <div className="middle">
                    <CustomButton 
                        label="Next Day >"
                        buttonStyle="blue"
                        action={()=>props.callback('next')}/>
                </div>
            </div>
            <br />
            {props.scheduledTasks.length > 0 ?
                <div className='flex'>
                    {props.scheduledTasks.map(scheduledTask=>(
                        <div 
                            key={scheduledTask.id}
                            className='sized30'>
                            <SingleScheduledTask
                                objectives={props.objectives}
                                scheduledTask={scheduledTask}
                                employeeMap={props.employeeMap}
                                className='sized30' />
                        </div>
                    ))}
                </div>
                :
                <div>
                {props.employeeId ?
                    <div className="border centered">
                        <h4 className="spaced">
                            You currently don't have any scheduled tasks 
                            for {props.employeeMap[props.employeeId]} on {props.month}
                            -{props.day}-{props.year}!  
                        </h4>
                        <h4 className="spaced">
                            Add some scheduled tasks using the button above to 
                            see them here.
                        </h4>
                    </div>
                :
                    <div className="border centered">
                        <h4 className="spaced">
                            You currently don't have any scheduled tasks 
                            for {props.month}-{props.day}-{props.year}! 
                        </h4>
                        <h4 className="spaced">
                            Add some scheduled tasks using the button above to 
                            see them here.
                        </h4>
                    </div>
                }
                </div>
            }
        </div>
    )
}


export default Days;