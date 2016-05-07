import { combineReducers } from 'redux';
import { RECEIVE_ACTIVITIES, 
        ADD_TO_BUILDER, 
        DELETE_FROM_BUILDER } from '../constants/ActionTypes';

export function activities(state = [], action) {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return action.activities
    default:
      return state
  }
}