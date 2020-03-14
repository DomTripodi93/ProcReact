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
import Employees from './components/schedule/employees/employees';


const App = (props) => {
  const [authValue, setAuthValue] = useState(props.isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    props.checkUser(userId, token);
    setAuthValue(props.isAuthenticated)
  }, [props]);

  return (
    <div>
      <Header />
      {authValue ? 
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/employees' component={Employees} />
        </Switch>
        :
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/signin' component={Signin} />
        </Switch>
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: (userId, token) => dispatch(checkUser(userId, token))
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
