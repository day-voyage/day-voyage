import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { 
  RouteHandler, 
  Router, 
  Route, 
  Link, 
  browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Nav from './NavBar/Nav';
import Activities from './Activities/Activities';
import Index from './Index/Index';
import Confirmation from './Confirmation/Confirmation';

import Reducer from '../redux/reducers';

const store = createStore(
  Reducer
)

const history = syncHistoryWithStore(browserHistory, store)

// var ReactRouter = window.ReactRouter;
// var RouteHandler = ReactRouter.RouteHandler;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var Link = ReactRouter.Link;
// var browserHistory = ReactRouter.browserHistory;


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Nav />
            <Router history={ browserHistory }>
              <Route path="/" component={ Index }></Route>
              <Route path="/activities" component={ Activities }></Route>
              <Route path="/confirmation" component={ Confirmation }></Route>
              <Route path="/*" component={ Index }></Route>
            </Router>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
