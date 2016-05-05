import * as React from 'react';
import { 
  Router, 
  Route,
  browserHistory } from 'react-router';

import Index from '../Components/Index/Index';
import Activities from '../Components/Activities';
import Confirmation from '../Components/Confirmation';


var Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Index } />
    <Route path="/activities" component={ Activities } />
    <Route path="/confirmation" component={ Confirmation } />
    <Route path="/*" component={ Index } />
  </Router>
);

module.exports = Routes;