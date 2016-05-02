import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { 
  RouteHandler, 
  Router, 
  Route,
  IndexRoute,
  Link,
  browserHistory } from 'react-router';

import Activities from '../Components/Activities/Activities';
import Index from '../Components/Index/Index';
import Confirmation from '../Components/Confirmation/Confirmation';


  var Routes = (
    <Router history={ browserHistory }>
      <Route path="/" component={ Index }>
        <IndexRoute component= { Index } />
        <Route path="/activities" component={ Activities } />
        <Route path="/confirmation" component={ Confirmation } />
        <Route path="/*" component={ Index } />
      </Route>
    </Router>
  );

  module.exports = Routes;