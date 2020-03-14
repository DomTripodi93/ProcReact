import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../reducers/scheduling/employee/employee.actions';
import EmployeeNew from '../../components/schedule/employees/employee-new';
import Employees from '../../components/schedule/employees/employees';


const EmployeeContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchEmployees = props.fetchEmployees;

    useEffect(()=>{
        fetchEmployees();
    },[fetchEmployees]);

    const showEmployeeForm = () =>{
        setAddMode(!addMode)
    }

    return(
        <div>
            <EmployeeNew addMode={addMode} action={showEmployeeForm}/>
            <Employees action={showEmployeeForm} employees={props.employees}/>
        </div>
    )
}

const mapDispatchToProps = { fetchEmployees }

const mapStateToProps = state => ({
  employees: state.employee.employees
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);