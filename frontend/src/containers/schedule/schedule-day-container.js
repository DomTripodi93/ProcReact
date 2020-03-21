import React, { useState, useEffect } from 'react';
import CalendarHelper from '../../shared/calendar-helper';
import { fetchSchedulesByEmployee, fetchSchedulesByDate, resetSchedules } from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';
import Day from '../../components/schedule/schedule/day';
import ScheduleNew from '../../components/schedule/schedule/schedule-new';
import { fetchDepartments } from '../../reducers/process/department/department.actions';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import { fetchEmployeesForMap } from '../../reducers/schedule/employee/employee.actions';


const ScheduleDayContainer = props => {
    const [addMode, setAddMode] = useState(false);
    const helper = new CalendarHelper();
    const employeeId = props.match.params.employeeId;
    const month = +props.match.params.month;
    const day = +props.match.params.day;
    const year = +props.match.params.year;
    const lastDay = helper.checkDays(year, month);
    
    const departments = props.departments;
    const objectives = props.objectives;
    const fetchAllDepartments = props.fetchDepartments;
    const fetchObjectivesForDepartment = props.fetchObjectivesByDepartment;

    useEffect(()=>{
        if (departments.length < 1){
            fetchAllDepartments();
        } else if (Object.keys(objectives).length < 1){
            departments.forEach(dept =>{
                fetchObjectivesForDepartment(dept.deptName);
            })
        }
    },[
        departments, 
        objectives,
        fetchAllDepartments, 
        fetchObjectivesForDepartment
    ])


    const scheduledTasks = props.scheduledTasks;
    const fetchSchedulesForDate = props.fetchSchedulesByDate;
    const fetchSchedulesForEmployee = props.fetchSchedulesByEmployee;
    const scheduledTasksCalled = props.scheduledTasksCalled;

    useEffect(()=>{
        if (!scheduledTasksCalled){
            if (employeeId){
                fetchSchedulesForEmployee(employeeId, month, day, year);
            } else {
                fetchSchedulesForDate(month, day, year);
            }
        }
    },[
        scheduledTasks,
        scheduledTasksCalled,
        fetchSchedulesForEmployee,
        fetchSchedulesForDate,
        employeeId,
        month,
        day,
        year
    ])


    const employeeMap = props.employeeMap;
    const fetchEmployees = props.fetchEmployees;


    useEffect(()=>{
        if (Object.keys(employeeMap) < 1){
            fetchEmployees();
        }
    },[
        fetchEmployees,
        employeeMap
    ]);


    const changeDay = (movement) => {
        let route = ""
        if (movement === 'next'){
            if (day < lastDay){
                route = month + "/" + (day + 1) + "/" + year;
            } else {
                if (month < 12){
                    route = (month + 1) + "/1/" + year;
                } else {
                    route = "1/1/" + (year + 1);
                }
            }
        } else if (movement === 'last') {
            if (day > 1){
                route = month + "/" + (day - 1) + "/" + year;
            } else {
                if (month > 1){
                    let newDay = helper.checkDays(year, month-1);
                    route = (month - 1) + "/" + newDay + "/" + year;
                } else {
                    route = "12/31/" + (year-1);
                }
            }
        }
        props.resetSchedules();
        props.history.push("/day/" + route) 
    }


    const showScheduleForm = () =>{
        setAddMode(!addMode);
    }


    return(
        <div>
            <ScheduleNew 
                addMode={addMode}
                action={showScheduleForm}
                objectives={props.objectives}
                employeeId={employeeId}
                year={year}
                month={month}
                day={day}
                employeeMap={employeeMap}/>
            <Day 
                scheduledTasks={props.scheduledTasks} 
                callback={changeDay}
                employeeId={employeeId}
                year={year}
                month={month}
                day={day}
                employeeMap={employeeMap}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchSchedulesByEmployee: (employeeId, month, day, year) => dispatch(fetchSchedulesByEmployee(employeeId, month, day, year)),
        fetchSchedulesByDate: (month, day, year) => dispatch(fetchSchedulesByDate(month, day, year)),
        fetchDepartments: () => dispatch(fetchDepartments()),
        fetchObjectivesByDepartment: (deptName) => dispatch(fetchObjectivesByDepartment(deptName)),
        fetchEmployees: () => dispatch(fetchEmployeesForMap()),
        resetSchedules: () => dispatch(resetSchedules())
    }
}

const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks,
    scheduledTasksCalled: state.schedule.scheduledTasksCalled,
    departments: state.department.departments,
    objectives: state.objective.objectives,
    employeeMap: state.employee.employeeMap
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDayContainer);