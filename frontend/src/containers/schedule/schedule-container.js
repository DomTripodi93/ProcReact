import React, { useState } from 'react';
import Calendar from '../../components/schedule/schedule/calendar';
import CalendarNew from '../../components/schedule/schedule/calendar-new';


const ScheduleContainer = props => {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    const updateMonth = (selectedMonth) => {
        let monthSplit = selectedMonth.split("-");
        setYear(monthSplit[0]);
        setMonth(+monthSplit[1] -1);
    }

    return(
        <div>
            <CalendarNew 
                callback={updateMonth} 
                month={month} 
                year={year} />
            <Calendar 
                employeeId={props.match.params.employeeId} 
                date={date} 
                month={month} 
                year={year} />
        </div>
    )
}

export default ScheduleContainer;