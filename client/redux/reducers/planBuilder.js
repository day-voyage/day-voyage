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
      return initialState
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


// import * as types from '../constants/ActionTypes';

// const initialState = [];

// export default function planBuilder (state = initialState, action) {
//   // console.log('Action: ', action);
//   // console.log('State: ', state);

//   switch (action.type) {
//     case types.ADD_TO_BUILDER:
//       for (var i = 0; i < state.length; i++) {
//         if (state[i].activityId === action.activityId) {
//           return state;
//         }
//       }
//       return state.concat(action.activityId);
//     case types.DELETE_FROM_BUILDER:
//       var newState = state.slice();
//       for (var i = 0; i < newState.length; i++) {
//         if (newState[i].activityId === action.placeId) {
//           newState.splice(i, 1);
//         }
//       }
//       // console.log(newState);
//       return newState;
//     default:
//       return state;
//   }
// } 