import { createReducer } from '../utils';
import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  REORDER_UP,
  REORDER_DOWN
} from '../constants'
import {
  changingRoutes
} from '../actions'

const initialState = {
  activities: [],
};


export default createReducer(initialState, {
  [ADD_TO_BUILDER]: (state, payload) => {
    // console.log('state:',state);
    // console.log('activities',state.activities);
    var newState = state.activities.slice();
    newState.push(payload.activity);
    changingRoutes(newState);
    // return newState;
    // var newState = state.activities.concat[[payload.activity]];
    return Object.assign({}, state, {
      activities: newState
    });
  },
  [DELETE_FROM_BUILDER]: (state, payload) => {
    // console.log('payload in deleting from builder is:', payload);
    // console.log('state:',state);
    // console.log('activities',state.activities);
    var newState = state.activities.slice();
    var activityIndex = state.activities.indexOf(payload.activity);
    // console.log(activityIndex);
    newState.splice(activityIndex, 1);
    if (newState.length > 0) {
      changingRoutes(newState);
    }
    return Object.assign({}, state, {
      activities: newState
    });
  },
  [REORDER_UP]: (state, payload) => {
    // console.log('payload in reordering up:', payload);
    if (payload.activityIndex === 0) {
      return state;
    } else {
      var newState = state.activities.slice();
      var index = payload.activityIndex;
      var newIndex = payload.activityIndex - 1;
      newState[index] = newState.splice(newIndex, 1, newState[index])[0];
      console.log('newstate in reordering up is:', newState);
      return Object.assign({}, state, {
        activities: newState
      });
      // return [
      //   ...this.state.slice(0, index)
      // ];
    }
  },
  [REORDER_DOWN]: (state, payload) => {
    // console.log('payload in reordering down:', payload);
    if (payload.activityIndex === state.length - 1) {
      return state;
    } else {
      var newState = state.activities.slice();
      var index = payload.activityIndex;
      var newIndex = payload.activityIndex + 1;
      newState[index] = newState.splice(newIndex, 1, newState[index])[0];
      return Object.assign({}, state, {
        activities: newState
      });
    }
  },
})


// export function planBuilder(state = [], action) {
//   switch (action.type) {
//     case ADD_TO_BUILDER:
//       var newState = state.slice();
//       newState.push(action.activity);
//       changingRoutes(newState);
//       return newState;
//     case DELETE_FROM_BUILDER:
//       var newState = state.slice();
//       var activityIndex = state.indexOf(action.activity);
//       newState.splice(activityIndex, 1);
//       if (newState.length > 0) {

//         changingRoutes(newState);
//       }
//       return newState;
//     case REORDER_UP:
//       if (action.activityIndex === 0) {
//         return state;
//       } else {
//         var newState = state.slice();
//         var index = action.activityIndex;
//         var newIndex = action.activityIndex - 1;
//         newState[index] = newState.splice(newIndex, 1, newState[index])[0];
//         return newState;
//       }
//     case REORDER_DOWN:
//       if (action.activityIndex === state.length - 1) {
//         return state;
//       } else {
//         var newState = state.slice();
//         var index = action.activityIndex;
//         var newIndex = action.activityIndex + 1;
//         newState[index] = newState.splice(newIndex, 1, newState[index])[0];
//         return newState;
//       }
//     default:
//       return state
//   }
// }


