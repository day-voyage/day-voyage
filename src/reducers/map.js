import { createReducer } from '../utils';
import {
  CHANGE_ROUTES,
  RECEIVE_ROUTES
} from '../constants';

const initialState = {
  directions: null,
};

export default createReducer(initialState, {
  [CHANGE_ROUTES]: (state, payload) => {
    return Object.assign({}, state, {
      directions: payload.directions
    })
  },
  [RECEIVE_ROUTES]: (state, payload) => {
    return state;
  }
})


/*
export function directions(state = initialState.directions, action) {
  switch (action.type) {
    case CHANGE_ROUTES:
      return action.directions;
    case RECEIVE_ROUTES:
      return state;
    default:
      return state;
  }
}
*/
