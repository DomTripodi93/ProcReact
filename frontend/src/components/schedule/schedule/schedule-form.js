import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEmployee, updateEmployee } from '../../../reducers/schedule/employee/employee.actions';
import CustomButton from '../../../shared/elements/button/custom-button.component';
import FormInput from '../../../shared/elements/form-input/form-input.component';


const EmployeeForm = props => {
    const [employeeInfo, setEmployeeInfo] = useState({
      name: '',
      deptName: '',
      canEdit: '',
      title: '',
    });
  
    const { name, deptName, canEdit, title } = employeeInfo;

    useEffect(()=>{
        if (props.editMode){
            Object.keys(props.employeeInput).forEach(key =>{
                if (props.employeeInput[key] !== null){
                    setEmployeeInfo({[key]: props.employeeInput[key]});
                }
            })
            setEmployeeInfo(props.employeeInput);
        }
    },[props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode){
            props.updateEmployee(employeeInfo, props.callback);
        } else {
            props.addEmployee(employeeInfo, props.callback);
        }
    };

    const handleChange = event => {
      const { name, value } = event.target;
  
      setEmployeeInfo({ ...employeeInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode?
                <h3 className='centered'>
                    Fill out the form below to add an Employee
                </h3>
            :
                <h3 className='centered'>
                    {props.employeeInput.employeeId}: {props.employeeInput.name}
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Name'
                    type='name' 
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                    />
                <FormInput
                    label='Department'
                    type='deptName' 
                    name='deptName'
                    value={deptName}
                    onChange={handleChange}
                    />
                <FormInput
                    label='Process Admin'
                    type='canEdit' 
                    name='canEdit'
                    value={canEdit}
                    onChange={handleChange}
                    required
                    />
                <FormInput
                    label='Job Title'
                    type='title' 
                    name='title'
                    value={title}
                    onChange={handleChange}
                    />
                    <div className="grid50">
                        {!props.editMode ?
                            <CustomButton
                                buttonStyle="blue"
                                type="submit"
                                label="Add Employee"
                                />
                        :
                            <CustomButton
                                buttonStyle="blue"
                                type="submit"
                                label="Update Employee"
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
    addEmployee: (employee, callback) => {
        dispatch(addEmployee(employee, callback))
    },
    updateEmployee: (employee, callback) => {
        dispatch(updateEmployee(employee, callback))
    }
});


export default connect(null, mapDispatchToProps)(EmployeeForm);