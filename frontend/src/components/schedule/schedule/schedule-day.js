import React, { useState } from 'react';
import SingleScheduledTask from './single-scheduled-task';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import { connect } from 'react-redux';
import { deleteSchedule } from '../../../reducers/schedule/schedule/schedule.actions';
import ScheduledTaskForm from './schedule-form';



const ScheduleDay = props => {
    const [editMode, updateEditMode] = useState(false);
    const [selectedTask, setSelectedTask] = useState("");

    const setEditMode = (task) => {
        setSelectedTask(task);
        updateEditMode(!editMode);
    }

    const handleDelete = (task) => {
        if (window.confirm(
          "Are you sure you want to delete this scheduled task: " +task.objectiveName+ "?"
          )){
            props.deleteSchedule(task.id);
        }
    }

    return(
        <div>
            {editMode ?
                <div>
                    <ScheduledTaskForm
                        callback={setEditMode} 
                        objectives={props.objectives}
                        employeeMap={props.employeeMap}
                        employeeId={props.employeeId}
                        editMode={editMode}
                        scheduledTaskInput={selectedTask}
                        year={props.year}
                        month={props.month}
                        day={props.day} />
                </div>
            :
                null
            }
            {props.scheduledTasks.length > 0 ?
                <div>
                    {props.employeeId ?
                        <div>
                            <div className="grid-one-employee-button size-holder middle">
                                <div className="grid-one-employee">
                                    <div className="inner-border-left-header"><h5>Time</h5></div>
                                    <div className="inner-border-left-header"><h5>Department</h5></div>
                                    <div className="inner-border-left-header"><h5>Objective</h5></div>
                                </div>
                                <div className="inner-border-right-header"></div>
                            </div>
                            {props.scheduledTasks.map(scheduledTask=>(
                                <div 
                                    key={scheduledTask.id}
                                    className="grid-one-employee-button size-holder middle">
                                    <SingleScheduledTask
                                        objectives={props.objectives}
                                        scheduledTask={scheduledTask}
                                        employeeMap={props.employeeMap}
                                        employeeId={props.employeeId}
                                        year={props.year}
                                        month={props.month}
                                        day={props.day}
                                        className='sized30' />
                                        <div className="grid50-colapse inner-border-right">
                                            <CustomButton 
                                                buttonStyle="blue small"
                                                action={()=>{setEditMode(scheduledTask)}}
                                                label="Edit"/>
                                            <CustomButton 
                                                buttonStyle="red small"
                                                action={()=>{handleDelete(scheduledTask)}}
                                                label="Delete"/>
                                        </div>
                                </div>
                            ))}
                        </div>
                    :
                        <div>
                            <div className="grid-all-employees-button size-holder middle">
                                <div className="grid-all-employees">
                                    <div className="inner-border-left-header"><h5 className="grid-header-text">Employee</h5></div>
                                    <div className="inner-border-left-header"><h5 className="grid-header-text">Time</h5></div>
                                    <div className="inner-border-left-header"><h5 className="grid-header-text">Department</h5></div>
                                    <div className="inner-border-left-header"><h5 className="grid-header-text">Objective</h5></div>
                                </div>
                                <div className="inner-border-right-header"></div>
                            </div>
                            {props.scheduledTasks.map(scheduledTask=>(
                                <div 
                                    key={scheduledTask.id}
                                    className="grid-all-employees-button size-holder middle">
                                    <SingleScheduledTask
                                        objectives={props.objectives}
                                        scheduledTask={scheduledTask}
                                        employeeMap={props.employeeMap}
                                        employeeId={props.employeeId}
                                        year={props.year}
                                        month={props.month}
                                        day={props.day}
                                        className='sized30' />
                                        <div className="grid50-colapse inner-border-right">
                                            <CustomButton 
                                                buttonStyle="blue small"
                                                action={()=>{setEditMode(scheduledTask)}}
                                                label="Edit"/>
                                            <CustomButton 
                                                buttonStyle="red small"
                                                action={()=>{handleDelete(scheduledTask)}}
                                                label="Delete"/>
                                        </div>
                                </div>
                            ))} 
                        </div>
                    }
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
            <br />
            <div className="grid50">
                <div className="middle">
                    <CustomButton 
                        label="< Previous Day"
                        buttonStyle="soft-green"
                        action={()=>props.action('last')}/>
                </div>
                <div className="middle">
                    <CustomButton 
                        label="Next Day >"
                        buttonStyle="soft-green"
                        action={()=>props.action('next')}/>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteSchedule: (id) => dispatch(deleteSchedule(id))
    }
}


export default connect(null, mapDispatchToProps)(ScheduleDay);