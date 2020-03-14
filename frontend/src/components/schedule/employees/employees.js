import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../../reducers/scheduling/employee/employee.actions';

const Employees = props => {
    return(
        <div>
            employees
        </div>
    )
}

const mapDispatchToProps = { fetchEmployees }

const mapStateToProps = state => ({
  employees: state.employee.employees
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);