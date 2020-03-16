import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchObjectives } from '../../reducers/process/objective/objective.actions';
import ObjectiveNew from '../../components/process/objective/objective-new';
import Objectives from '../../components/process/objective/objectives';


const ObjectiveContainer = (props) => {
    const [addMode, setAddMode] = useState(false);
    const fetchObjectives = props.fetchObjectives;

    useEffect(()=>{
        fetchObjectives();
    },[fetchObjectives]);

    const showObjectiveForm = () =>{
        setAddMode(!addMode)
    }

    return(
        <div>
            <ObjectiveNew 
                addMode={addMode} 
                action={showObjectiveForm}/>
            <h2 className='centered'>Objectives</h2>
            <br />
            <Objectives 
                action={showObjectiveForm} 
                objectives={props.objectives}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => { 
    return {
        fetchObjectives: () => dispatch(fetchObjectives())
    }
}

const mapStateToProps = state => ({
  objectives: state.objective.objectives
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveContainer);