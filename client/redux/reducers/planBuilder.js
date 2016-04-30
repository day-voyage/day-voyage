import * as types from '../constants/ActionTypes.js';

const initialState = [];

export default function planBuilder (state = initialState, action) {
  // console.log('Action: ', action);
  // console.log('State: ', state);

  switch (action.type) {
    case types.ADD_TO_BUILDER:
      for (var i = 0; i < state.length; i++) {
        if (state[i].activityId === action.activity.activityId) {
          return state;
        }
      }
      return state.concat(action.place);
    case types.DELETE_FROM_BUILDER:
      var newState = state.slice();
      for (var i = 0; i < newState.length; i++) {
        if (newState[i].activityId === action.placeId) {
          newState.splice(i, 1);
        }
      }
      // console.log(newState);
      return newState;
    default:
      return state;
  }
}