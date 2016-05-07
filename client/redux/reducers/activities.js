import { combineReducers } from 'redux';
import { RECEIVE_ACTIVITIES, 
        ADD_TO_BUILDER, 
        DELETE_FROM_BUILDER } from '../constants/ActionTypes';

export function activities(state = [], action) {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return action.activities
    case ADD_TO_BUILDER:
      var newState = state.slice();
      action.activity.added = true;
      newState.push(action.activity);
      return newState;
    case DELETE_FROM_BUILDER:
      newState = state.slice();
      action.activity.added = false;
      newState.push(action.activity);
      return newState;
    default:
      return state
  }
}