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
import Routes from '../config/Routes';
import Reducer from '../redux/reducers';

const store = createStore(
  Reducer
)

const history = syncHistoryWithStore(browserHistory, store)


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
