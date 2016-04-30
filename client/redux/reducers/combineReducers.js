import { combineReducers } from 'redux';
import planBuilder from './planBuilder.js';
// import otherReducer1 from './otherReducer1.js';
// import otherReducer2 from './otherReducer2.js';
// import otherReducer3 from './otherReducer3.js';

const rootReducer = combineReducers({
  planBuilder,
  // otherReducer1,
  // otherReducer2,
  // otherReducer3
});

export default rootReducer;