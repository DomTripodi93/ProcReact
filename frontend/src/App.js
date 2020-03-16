import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkUser } from './reducers/user/user.actions';

import Header from './shared/header/header';
import Home from './containers/home/home';
import Register from './containers/registration/registration';
import Signin from './containers/registration/signin';
import Signout from './containers/registration/signout';
import EmployeeContainer from './containers/schedule/employee-container';
import DepartmentContainer from './containers/process/department-container';

import store from './reducers/store';
import { toggleDropDown } from './reducers/drop-down/drop-down.reducer';


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
            <Route exact path='/' component={Home} />
            <Route exact path='/signout' component={Signout} />
            <Route exact path='/employees' component={EmployeeContainer} />
            <Route exact path='/departments' component={DepartmentContainer} />
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
