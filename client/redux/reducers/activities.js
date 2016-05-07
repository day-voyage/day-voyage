import { combineReducers } from 'redux';
import { RECEIVE_ACTIVITIES, 
        ADD_TO_BUILDER, 
        DELETE_FROM_BUILDER } from '../constants/ActionTypes';

export function activities(state = [], action) {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return action.activities
    case ADD_TO_BUILDER:
      action.activity.added = true;
      return state;
    case DELETE_FROM_BUILDER:
      action.activity.added = false;
      return state;
    default:
      return state
  }
}