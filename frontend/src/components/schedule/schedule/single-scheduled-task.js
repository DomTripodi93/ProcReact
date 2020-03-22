import React from 'react';
import helpers from '../../../shared/helpers';



const SingleScheduledTask = props => {
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromDate(props.scheduledTask.date));
    return(
        <div>
            {props.employeeId ?
                <div className="grid-one-employee">
                    <div className="inner-border-left"><h5 className="grid-text">{time}</h5></div>
                    <div className="inner-border-left"><h5 className="grid-text">{props.scheduledTask.deptName}</h5></div>
                    <div className="inner-border-left"><h5 className="grid-text">{props.scheduledTask.objectiveName}</h5></div>
                </div>
            :
                <div className="grid-all-employees">
                    <div className="inner-border-left"><h5 className="grid-text">{props.scheduledTask.employeeId} - {props.scheduledTask.employeeName}</h5></div>
                    <div className="inner-border-left"><h5 className="grid-text">{time}</h5></div>
                    <div className="inner-border-left"><h5 className="grid-text">{props.scheduledTask.deptName}</h5></div>
                    <div className="inner-border-left"><h5 className="grid-text">{props.scheduledTask.objectiveName}</h5></div>
                </div>
            }
        </div>
    )
}

export default SingleScheduledTask;