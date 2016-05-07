import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  CONFIRM_REQUEST,
  CONFIRM_FAILURE
} from '../constants/ActionTypes'

export function planBuilder(state = [], action) {
  switch (action.type) {
    case ADD_TO_BUILDER:
      var newState = state.slice();
      newState.push(action.activity);
      return newState;
    case DELETE_FROM_BUILDER:
      var newState = state.slice();
      var activityIndex = state.indexOf(action.activity);
      newState.splice(activityIndex, 1);
      return newState;
    default:
      return state
  }
}