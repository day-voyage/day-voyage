import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as planBuilder, getQuantity, getAddedIds } from './planBuilder';
import { default as activities, getActivity } from './activities';
// import otherReducer1 from './otherReducer1.js';
// import otherReducer2 from './otherReducer2.js';
// import otherReducer3 from './otherReducer3.js';

export function getPlannerActivities(state) {
  return getAddedIds(state.planBuilder).map(id => Object.assign(
    {},
    getActivity(state.activities, id)
  ))
}

export default combineReducers({
  planBuilder,
  activities,
  // otherReducer1,
  // otherReducer2,
  // otherReducer3
  routing: routerReducer
});