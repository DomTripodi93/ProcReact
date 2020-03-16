import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDepartments } from '../../reducers/process/department/department.actions';


const DepartmentContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchDepartments = props.fetchDepartments;

    useEffect(()=>{
        fetchDepartments();
    },[fetchDepartments]);

    const showDepartmentForm = () =>{
        setAddMode(!addMode)
    }

    return(
        <div>
            <h2 className='centered'>Departments</h2>
            <br />
            {props.departments.length}
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchDepartments: () => dispatch(fetchDepartments())
    }
}

const mapStateToProps = state => ({
  departments: state.department.departments
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentContainer);