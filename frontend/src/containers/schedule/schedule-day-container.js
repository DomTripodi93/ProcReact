import React, { useState } from 'react';

const ScheduleDayContainer = props => {
    const employeeId = props.match.params.employeeId;
    const [month, setMonth] = useState(props.match.params.month);
    const [day, setDay] = useState(props.match.params.day);
    const [year, setYear] = useState(props.match.params.year);

    const changeDay = (movement) => {
        let date = new Date();
        if (movement === 'last'){

        } else if (movement === 'next') {

        }
    }

    return(
        <div>
            {employeeId}
            <br />
            {month} - {day} - {year}
            <br />
            Schedule Day Container
        </div>
    )
}

export default ScheduleDayContainer;