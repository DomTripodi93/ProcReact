import React, { useState, useEffect } from 'react';
import { fetchSingleObjective } from '../../reducers/process/objective/objective.actions';
import { connect } from 'react-redux';
import SingleObjective from '../../components/process/objective/single-objective';


const SingleObjectiveContainer = props =>{
    const [deptName, setDeptName] = useState("");

    useEffect(()=>{
        if (!props.inDept){
            setDeptName(props.match.params.deptName);
            if (!props.selectedObjective.deptName){
                props.fetchSingleObjective(
                    props.match.params.objectiveName, 
                    props.match.params.deptName
                );
            }
        }
    },[props])

    return(
        <div>
            {props.selectedObjective ?
                <SingleObjective 
                    objective={props.selectedObjective}
                    deptName={deptName}
                    inDept={false}/>
            :
                <div>didnt work</div>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSingleObjective: (objectiveName, deptName) => dispatch(fetchSingleObjective(objectiveName, deptName))
    }
}

const mapStateToProps = state => ({
    selectedObjective: state.objective.selectedObjective
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleObjectiveContainer);