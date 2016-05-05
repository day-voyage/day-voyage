import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  CONFIRM_REQUEST,
  CONFIRM_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
}

function addedIds(state = initialState.addedIds, action) {
  switch (action.type) {
    case ADD_TO_BUILDER:
      if (state.indexOf(action.activityId) !== -1) {
        return state
      }
      return [ ...state, action.activityId ]
    case DELETE_FROM_BUILDER:
      var newState = state.slice();
      var activityIndex = state.indexOf(action.activityId);
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