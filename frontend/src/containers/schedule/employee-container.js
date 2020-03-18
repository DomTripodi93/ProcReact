import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../reducers/schedule/employee/employee.actions';
import EmployeeNew from '../../components/schedule/employee/employee-new';
import Employees from '../../components/schedule/employee/employees';


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
            <EmployeeNew 
                addMode={addMode} 
                action={showEmployeeForm}/>
            <h2 className='centered'>Employees</h2>
            <br />
            <Employees
                employees={props.employees}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchEmployees: () => dispatch(fetchEmployees()) 
    }
}

const mapStateToProps = state => ({
  employees: state.employee.employees
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);