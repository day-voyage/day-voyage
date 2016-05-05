import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as planBuilder, getQuantity, getAddedIds, deleteActivity } from './planBuilder';
import { default as activities, getActivity } from './activities';
import { default as confirmation, saveToDb } from './confirmation';

// import otherReducer1 from './otherReducer1.js';
// import otherReducer2 from './otherReducer2.js';
// import otherReducer3 from './otherReducer3.js';

export function getPlannerActivities(state) {
  return getAddedIds(state.planBuilder).map(id => Object.assign(
    {},
    getActivity(state.activities, id)

  ))
}

export function getConfirmActivities(confirmationState) {
  var results = [];
  for (var prop in confirmationState) {
    results.push(confirmationState[prop]);
  }
  return results;
}
 
export default combineReducers({
  planBuilder,
  activities,
  confirmation,
  // otherReducer1,
  // otherReducer2,
  // otherReducer3
  routing: routerReducer
});