import _ from 'lodash';


class CalendarHelper {
    setDays = (inputYear, inputMonth) =>{
        let monthDaysHold = _.range(1, new Date(inputYear, inputMonth+1, 0).getDate() + 1);
        return monthDaysHold
      }
      //Sets values for days of month to be displayed in expected format
    
    setFirstDays = (inputYear, inputMonth) => {
        return _.range(0, new Date(inputYear, inputMonth, 1).getDay());
    }
    //Sets placeholder for days of week before first day of month

    setBaseRoute = (inputMonth, employeeId) => {
        let baseRouteHold = ""
        if (employeeId){
        baseRouteHold = "/day/" + employeeId + "/" + (inputMonth+1);
        } else {
        baseRouteHold = "/day/" + (inputMonth+1);
        }
        return baseRouteHold
    }
    //Sets base route for linking to day of month scheduled tasks
}

export default CalendarHelper;