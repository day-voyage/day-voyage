import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  CONFIRM_REQUEST,
  CONFIRM_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
}

function addedIds(state = [], action) {
  switch (action.type) {
    case ADD_TO_BUILDER:
      var newState = state.slice();
      newState.push(action.activity);
      return newState;
    case DELETE_FROM_BUILDER:
      var newState = state.slice();
      var activityIndex = state.indexOf(action);
      newState.splice(activityIndex, 1);
      return newState;
    default:
      return state
  }
}

export default function planBuilder(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_REQUEST:
      return state.addedIds
    case CONFIRM_FAILURE:
      return action.planBuilder
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
      }
  }
}

export function getAddedIds(state) {
  return state.addedIds
}