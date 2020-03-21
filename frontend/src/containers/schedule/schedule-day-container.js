import React, { useState, useEffect } from 'react';
import CalendarHelper from './calendar-helper';
import { fetchSchedulesByEmployee, fetchSchedulesByDate } from '../../reducers/schedule/schedule/schedule.actions';
import { connect } from 'react-redux';
import Day from '../../components/schedule/schedule/day';
import ScheduleNew from '../../components/schedule/schedule/schedule-new';


const ScheduleDayContainer = props => {
    const [addMode, setAddMode] = useState(false);
    const fetchSchedulesForDate = props.fetchSchedulesByDate;
    const fetchSchedulesForEmployee = props.fetchSchedulesByEmployee
    const helper = new CalendarHelper();
    const employeeId = props.match.params.employeeId;
    const month = +props.match.params.month;
    const day = +props.match.params.day;
    const year = +props.match.params.year;
    const lastDay = helper.checkDays(year, month);

    useEffect(()=>{
        if (employeeId){
            fetchSchedulesForEmployee(employeeId, month, day, year);
        } else {
            fetchSchedulesForDate(month, day, year);
        }
    },[fetchSchedulesForDate,fetchSchedulesForEmployee]);

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
        props.history.push("/day/" + route) 
    }

    const showScheduleForm = () =>{
        setAddMode(!addMode);
    }

    return(
        <div>
            <ScheduleNew 
                addMode={addMode}
                action={showScheduleForm}/>
            <Day 
                scheduledTasks={props.scheduledTasks} 
                callback={changeDay} />
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchSchedulesByEmployee: (employeeId, month, day, year) => dispatch(fetchSchedulesByEmployee(employeeId, month, day, year)),
        fetchSchedulesByDate: (month, day, year) => dispatch(fetchSchedulesByDate(month, day, year))
    }
}

const mapStateToProps = state => ({
    scheduledTasks: state.schedule.scheduledTasks
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDayContainer);



// <button onClick={()=>changeDay('last')}>Last</button>
// <button onClick={()=>changeDay('next')}>Next</button>