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
import configStore from '../redux/store/configStore.js'
// import Activities from './Activities';
// import Index from './Index/Index';
// import Confirmation from './Confirmation/Confirmation';

// import { initApp } from '../redux/actions'
// import { getAllActivities } from '../redux/actions'

// import Reducer from '../redux/reducers';

// const middleware = process.env.NODE_ENV === 'production' ?
//   [ thunk ] :
//   [ thunk, logger() ]

// export const store = createStore(
//   Reducer,
//   applyMiddleware(...middleware)
// )

// const history = syncHistoryWithStore(browserHistory, store)

// // store.dispatch(initApp());
// store.dispatch(getAllActivities({city: 'san francisco', category: 'food'}));

const store = configStore();
console.log('app.js store: ', store);
const history = syncHistoryWithStore(browserHistory, store)

export class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Nav />
          <Router history={history} routes={Routes} />
        </div>
      </Provider>
      )

  }
};
 
// PropTypes: {
//   children: React.PropTypes.any
// }

ReactDOM.render(<App/>, document.getElementById('app'));

