import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Calendar = props => {
    var today = props.date.getDate();
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    var oldMonth = month;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
      
    const setDays = (inputYear, inputMonth) =>{
      let monthDaysHold = _.range(1, new Date(inputYear, inputMonth+1, 0).getDate() + 1);
      return monthDaysHold
    }
    //Sets values for days of month to be displayed in expected format

    const monthDays = setDays(year, month)
    
    const setFirstDays = (inputYear, inputMonth) => {
        return _.range(0, new Date(inputYear, inputMonth, 1).getDay());
    }
    //Sets placeholder for days of week before first day of month

    const firstDayOfMonth = setFirstDays(year, month);

    const setBaseRoute = (inputMonth) => {
        let baseRouteHold = ""
        if (props.employeeId){
          baseRouteHold = "/day/" + props.employeeId + "/" + (inputMonth+1);
        } else {
          baseRouteHold = "/day/" + (inputMonth+1);
        }
        return baseRouteHold
    }
    //Sets base route for linking to day of month scheduled tasks

    const baseRoute = setBaseRoute(month)

    useEffect(()=>{
        setMonth(props.month);
        setYear(props.year);
    },[props])
    
    return(
        <div>
            <div className="grid7split border">
                {days.map(day =>(
                    <div key={day} className="day-label-border">
                        <h5 className="centered label-text">{day}</h5>
                    </div>
                ))}
                {firstDayOfMonth.map(date =>(
                    <div key={date} className="day-border"></div>
                ))}
                {monthDays.map(date => (
                    <div key={date}>
                        {date !== today || (date === today && month !== oldMonth) ?
                            <Link to={baseRoute+'/'+date+'/'+year}>
                                <div className="day-border padded">
                                    <h5 className="label-text date">{date}</h5>
                                </div>
                            </Link>
                        :
                            null
                        }
                        {date === today && month === oldMonth ?
                            <Link to={baseRoute+'/'+date+'/'+year}>
                                <div className="today-border padded" >
                                    <h5 className="label-text date">{date}</h5>
                                </div>
                            </Link>
                        :
                            null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;