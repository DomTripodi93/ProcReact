import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addScheduledTask, updateScheduledTask } from '../../../reducers/schedule/schedule/schedule.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';
import FormSelect from '../../../shared/elements/form-select/form-select.component';
import helpers from '../../../shared/helpers';



const ScheduledTaskForm = props => {
    const helper = new helpers();
    const employeeIdOptions = Object.keys(props.employeeMap).map(key =>{
        return { value: key, label: key + " - " + props.employeeMap[key]};
    });
    const deptOptions = [{value: "None", label: "None"}, ...Object.keys(props.objectives).map(key =>{
        props.objectives[key] = props.objectives[key].map(key =>{
            return {value: key.objectiveName, label: key.objectiveName}
        })
        return {value: key, label: key}
    })];
    const [objectiveOptions, setObjectiveOptions] = useState([{value: "None", label: "None"}]);
    const [scheduledTaskInfo, setScheduledTaskInfo] = useState({
      employeeId: employeeIdOptions[0].value,
      employeeName: props.employeeMap[employeeIdOptions[0].value],
      deptName: 'None',
      objectiveName: 'None',
      date: helper.setDateForIso(props.year, props.month, props.day) + "T07:00:00"
    });
    const { employeeId, deptName, objectiveName, date } = scheduledTaskInfo;

    useEffect(()=>{
        if (props.editMode){
            setScheduledTaskInfo(props.scheduledTaskInput);
        }
    },[props])

    const handleSubmit = async event => {
        console.log(scheduledTaskInfo)
        event.preventDefault();
        if (props.editMode){
            if (scheduledTaskInfo !== props.scheduledTaskInput){
                props.updateScheduledTask(scheduledTaskInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.addScheduledTask(scheduledTaskInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "deptName"){
            setScheduledTaskInfo({ ...scheduledTaskInfo, [name]: value });
            setObjectiveOptions(props.objectives[value])
        } else if (name === "employeeId") {
            setScheduledTaskInfo({ 
                ...scheduledTaskInfo, 
                employeeName: props.employeeMap[value],
                employeeId: value
            })
        } else {
            setScheduledTaskInfo({ ...scheduledTaskInfo, [name]: value });
        }
    };

    return (
        <div className='middle'>
            {!props.editMode?
                <h3 className='centered'>
                    Fill out the form below to add an ScheduledTask
                </h3>
            :
                <h3 className='centered'>
                    {props.scheduledTaskInput.scheduledTaskId}: {props.scheduledTaskInput.name}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormSelect
                    label="Employee"
                    name='employeeId'
                    value={employeeId}
                    options={employeeIdOptions}
                    onChange={handleChange}
                    />
                <FormSelect
                    label="Department"
                    name='deptName'
                    value={deptName}
                    options={deptOptions}
                    onChange={handleChange}
                    />
                <FormSelect
                    label="Objective"
                    name='objectiveName'
                    value={objectiveName}
                    options={objectiveOptions}
                    onChange={handleChange}
                    />
                <FormInput
                    label='Date'
                    type='datetime-local' 
                    name='date'
                    value={date}
                    onChange={handleChange}
                    />
                    <div className="grid50">
                        {!props.editMode ?
                            <CustomButton
                                buttonStyle="blue"
                                type="submit"
                                label="Add"
                                />
                        :
                            <CustomButton
                                buttonStyle="blue"
                                type="submit"
                                label="Update"
                                />
                        }
                        <CustomButton
                            buttonStyle="red"
                            action={props.callback}
                            label="Cancel"
                        />
                    </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addScheduledTask: (scheduledTask, callback) => {
        dispatch(addScheduledTask(scheduledTask, callback))
    },
    updateScheduledTask: (scheduledTask, callback) => {
        dispatch(updateScheduledTask(scheduledTask, callback))
    }
});


export default connect(null, mapDispatchToProps)(ScheduledTaskForm);