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
        return {value: key, label: key}
    })];

    const setObjectiveOptionSets = (options) =>{
        let newOptions = {};
        let keys = Object.keys(options);
        keys.forEach((key)=>{
            newOptions[key] = options[key].map(option =>{
                return {value: option.objectiveName, label: option.objectiveName};
            });
        });
        return newOptions;
    }
    const objectiveOptionSets = setObjectiveOptionSets(props.objectives);

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
        if (props.employeeId){
            setScheduledTaskInfo({...scheduledTaskInfo, employeeId: props.employeeId})
        }
        if (props.scheduledTaskInput){
            setScheduledTaskInfo(props.scheduledTaskInput);
            setObjectiveOptions(objectiveOptionSets[props.scheduledTaskInput.deptName])
        }
    },[props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode){
            if (scheduledTaskInfo !== props.scheduledTaskInput){
                props.updateScheduledTask(scheduledTaskInfo, props.callback);
            } else {
                props.callback();
            }
        } else {
            props.callback();
            props.addScheduledTask(scheduledTaskInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "deptName"){
            setObjectiveOptions(objectiveOptionSets[value])
            setScheduledTaskInfo({ ...scheduledTaskInfo, deptName: value, objectiveName: objectiveOptionSets[value][0].value });
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
                    Edit the scheduled task below
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormSelect
                    label="Employee"
                    name='employeeId'
                    value={scheduledTaskInfo.employeeId}
                    options={employeeIdOptions}
                    onChange={handleChange}
                    />
                <FormSelect
                    label="Department"
                    name='deptName'
                    value={scheduledTaskInfo.deptName}
                    options={deptOptions}
                    onChange={handleChange}
                    />
                <FormSelect
                    label="Objective"
                    name='objectiveName'
                    value={scheduledTaskInfo.objectiveName}
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