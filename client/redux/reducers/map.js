import {
  CHANGE_ROUTES,
  RECEIVE_ROUTES
} from '../constants/ActionTypes';

const initialState = {
  directions: null,
};

export function directions(state = initialState.directions, action) {
  switch (action.type) {
    case RECEIVE_ROUTES:
      return state;
    case CHANGE_ROUTES:
      return action.directions;
    default:
      return state;
  }
}
