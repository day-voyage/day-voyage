import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { 
  RouteHandler, 
  Router, 
  Route, 
  Link, 
  browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Nav from './NavBar/Nav';
import Routes from '../config/Routes';
import Activities from './Activities';
import Index from './Index/Index';
import Confirmation from './Confirmation/Confirmation';

import { initApp } from '../redux/actions'
import Reducer from '../redux/reducers';

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const store = createStore(
  Reducer,
  applyMiddleware(...middleware)
)

const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(initApp())

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Nav />
            { Routes }
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
