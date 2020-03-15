import React, { useEffect } from 'react';
import SingleEmployee from '../single-employee/single-employee';

const Employees = props => {

    return(
        <div>
            {props.employees.length > 0 ?
                <div className='flex'>
                    {props.employees.map(employee=>(
                        <div className='sized30'>
                        <SingleEmployee
                            employee={employee}
                            key={employee.employeeId}
                            className='sized30' />
                        </div>
                    ))}
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any employees! 
                    </h4>
                    <h4 className="spaced">
                        <a href={null} onClick={props.action}>Add some employees</a> to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default Employees;