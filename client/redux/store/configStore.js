import { browserHistory } from 'react-router';
import * as React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Reducer from '../reducers';

export default function configStore(initialState) {

  const middleware = process.env.NODE_ENV === 'production' ?
    [ thunk ] :
    [ thunk, logger()];

  const store = createStore(
    Reducer,
    applyMiddleware(...middleware)
  );

  return store;
}