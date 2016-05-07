import * as React from 'react';
import { 
  Router, 
  Route,
  browserHistory } from 'react-router';

import Index from '../Components/Index/Index';
import Activities from '../Components/Activities';
import Maps from '../Components/Helpers/Maps';
import UpdateProfile from '../Components/User/UpdateProfile'


var Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Index } />
    <Route path="/activities" component={ Activities } />
    <Route path="/updateprofile" component = { UpdateProfile } />
    <Route path="/*" component={ Index } />
  </Router>
);

module.exports = Routes;