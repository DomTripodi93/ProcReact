import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './shared/header/header';
import Home from './containers/home/home';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
};

export default App;
