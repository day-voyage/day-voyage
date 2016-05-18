// import { createReducer } from '../utils';
import {
  RECEIVE_FILTER
} from '../constants';

const initialState = {
    neighborhoods: [],
    categories: [],
    budget: 0,
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FILTER:
      return action.filter;
    default:
      return state;
  }
}


