import React from 'react';
import CustomButton from '../../../shared/elements/button/custom-button.component';



const Employees = props => {
    return(
        <div>
            {props.employees.length > 0 ?
                <div>
                    {props.employees.map(employee=>(
                        <h5 key={employee.employeeId}>
                            {employee.name}
                        </h5>
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