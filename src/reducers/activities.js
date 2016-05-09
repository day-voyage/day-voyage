import { createReducer } from '../utils';
import { RECEIVE_ACTIVITIES,
         ADD_TO_BUILDER,
         DELETE_FROM_BUILDER } from '../constants';
import { pushState } from 'redux-router';


export default function activities(state = [], action) {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return action.activities
    case ADD_TO_BUILDER:
      action.activity.added = true;
      action.activity.icon = '';
      return state;
    case DELETE_FROM_BUILDER:
      action.activity.added = false;
      action.activity.icon = 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0';
      return state;
    default:
      return state
  }
}

// export default createReducer(initialState, {
//   [RECEIVE_ACTIVITIES]: (state, payload) => {
//     return Object.assign({}, state, {
//       'activities': payload.activities
//     });
//   },
//   [ADD_TO_BUILDER]: (state, payload) => {
//     return Object.assign({}, state, {
//       added: payload.activity.added
//     });
//   },
//   [DELETE_FROM_BUILDER]: (state, payload) => {
//     return Object.assign({}, state, {
//       added: payload.activity.added
//     });
//   }
// });
