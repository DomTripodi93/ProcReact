import React, { useState } from 'react';
import CalendarHelper from '../../components/schedule/schedule/calendar-helper';


const ScheduleDayContainer = props => {
    const helper = new CalendarHelper();
    const employeeId = props.match.params.employeeId;
    const month = +props.match.params.month;
    const day = +props.match.params.day;
    const year = +props.match.params.year;
    const lastDay = helper.checkDays(year, month)

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

    return(
        <div>
            <button onClick={()=>changeDay('last')}>Last</button>
            <button onClick={()=>changeDay('next')}>Next</button>
        </div>
    )
}

export default ScheduleDayContainer;