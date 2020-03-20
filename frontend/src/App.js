import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import store from './reducers/store';
import './App.css';
import { toggleDropDown } from './reducers/drop-down/drop-down.reducer';
import { checkUser } from './reducers/user/user.actions';
import Header from './shared/header/header';

import Home from './containers/home/home';

import Register from './containers/registration/registration';
import Signin from './containers/registration/signin';
import Signout from './containers/registration/signout';

import DepartmentContainer from './containers/process/department-container';
import SingleObjectiveContainer from './containers/process/single-objective-container';
import SingleStepContainer from './containers/process/single-step-container';

import EmployeeContainer from './containers/schedule/employee-container';
import EmployeeDayContainer from './containers/schedule/employee-day-container';
import ScheduleDayContainer from './containers/schedule/schedule-day-container';
import ScheduleContainer from './containers/schedule/schedule-container';
import EmployeeScheduleContainer from './containers/schedule/employee-schedule-container';


const App = (props) => {
  const [authValue, setAuthValue] = useState(props.isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    if (!props.isAuthenticated){
      props.checkUser(userId, token);
    }
    setAuthValue(props.isAuthenticated)
  }, [props]);

  const checkDropDown = () => {
    if (!store.getState().dropDown.hidden){
      props.toggleDropDown();
    }
  }

  return (
    <div id="page" onClick={checkDropDown}>
      <Header />
      <div>
        {authValue ? 
          <Switch>
            <Route exact path='/' component={ScheduleContainer} />
            <Route exact path='/signout' component={Signout} />
            
            <Route exact path='/departments' component={DepartmentContainer} />
            <Route path='/objective/:deptName/:objectiveName' component={SingleObjectiveContainer} />
            <Route path='/step/:deptName/:objectiveName/:stepNumber' component={SingleStepContainer} />
            
            <Route exact path='/employees' component={EmployeeContainer} />
            <Route exact path='/schedule' component={ScheduleContainer} />
            <Route path='/schedule/:employeeId' component={EmployeeScheduleContainer} />
            <Route exact path='/day' component={ScheduleDayContainer} />
            <Route path='/day/:employeeId' component={EmployeeDayContainer} />
          </Switch>
          :
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={Signin} />
          </Switch>
      }
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: (userId, token) => dispatch(checkUser(userId, token)),
    toggleDropDown: () => dispatch(toggleDropDown())
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
