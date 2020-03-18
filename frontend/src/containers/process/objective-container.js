import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectivesByDepartment } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchObjectives = props.fetchObjectives;
    const deptName = props.deptName;

    useEffect(()=>{
        fetchObjectives(deptName);
    },[fetchObjectives, deptName]);

    const showObjectiveForm = () =>{
        setAddMode(!addMode)
    }

    return(
        <div>
            <h3 className='centered'>Objectives</h3>
            <div className="grid100">
                <ObjectiveNew 
                    deptName={deptName}
                    addMode={addMode} 
                    action={showObjectiveForm}/>
            </div>
            <br />
            {props.objectives[deptName] ?
                <Objectives 
                    deptName={deptName}
                    objectives={props.objectives[deptName]}/>
            :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchObjectives: (deptName) => dispatch(fetchObjectivesByDepartment(deptName))
    }
}

const mapStateToProps = state => ({
    objectives: state.objective.objectives
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);