import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Calendar = props => {
    var date = new Date();
    var today = date.getDate();
    var month = date.getMonth();
    var monthHold = "" + (month + 1);
    var year = date.getFullYear();
    var day = date.getDay();
    var defaultMonth = ""; 
    var oldMonth = month;
    var baseRoute = "";
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var monthDays = [];
    var firstDayOfMonth = [];

  
    const initializeMonth = () =>{
      if (month < 10){
        monthHold = "0" + monthHold;
      }
      defaultMonth = year + "-" + monthHold;
      setDate();
    }
    //Holds default values for current month and year, for styling of current day
      
    const setDate = () =>{
      monthDays = _.range(1, daysInMonth(year, month+1) + 1);
      firstDayOfMonth = _.range(0, new Date(year, month, 1).getDay());
      if (props.employeeId){
        baseRoute = props.employeeId + "/" + (month+1);
      } else {
        baseRoute = "" + (month+1);
      }
    }
    //Sets values for days of month to be displayed in expected format
  
    const daysInMonth = (year, month) =>{
      return new Date(year, month, 0).getDate();
    }
    //Returns number of days in the month

    initializeMonth();
    
    return(
        <div>
            Calendar
            <div class="grid7split border">
                {days.map(day =>(
                    <div class="day-label-border">
                        <h5 class="centered label-text">{day}</h5>
                    </div>
                ))}
                {firstDayOfMonth.map(date =>(
                    <div class="day-border"></div>
                ))}
                {monthDays.map(date => (
                    <div>
                        {date !== today || date === today && month !== oldMonth ?
                            <Link to={baseRoute+'/'+date+'/'+year}>
                                <div class="day-border padded">
                                    <h5 class="label-text date">{date}</h5>
                                </div>
                            </Link>
                        :
                            null
                        }
                        {date === today && month === oldMonth ?
                            <Link to={baseRoute+'/'+date+'/'+year}>
                                <div class="today-border padded" >
                                    <h5 class="label-text date">{date}</h5>
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