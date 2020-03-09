import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './shared/header/header';
import Home from './containers/home/home';
import Register from './containers/registration/registration'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </div>
  );
};

export default App;
