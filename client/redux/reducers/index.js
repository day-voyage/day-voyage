import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { planBuilder } from './planBuilder';
// import otherReducer1 from './otherReducer1.js';
// import otherReducer2 from './otherReducer2.js';
// import otherReducer3 from './otherReducer3.js';

export default combineReducers({
  planBuilder,
  // otherReducer1,
  // otherReducer2,
  // otherReducer3
  routing: routerReducer
});