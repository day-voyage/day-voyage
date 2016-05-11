import { createReducer } from '../utils';
import { RECEIVE_ACTIVITIES,
         ADD_TO_BUILDER,
         DELETE_FROM_BUILDER,
         CHECK_CITY,
         UNCHECK_CITY } from '../constants';
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
    case CHECK_CITY:
      var newState = state.slice()
      newState.forEach((activity) => {
        if (activity.neighborhood[0].toUpperCase() === action.city.toUpperCase()) {
          activity.visible = true;
        }
      })
      return newState;
    case UNCHECK_CITY:
      var newState = state.slice()
      newState.forEach((activity) => {
        if (activity.neighborhood[0].toUpperCase() === action.city.toUpperCase()) {
          activity.visible = false;
        }
      })
      return newState;
    default:
      return state
  }
}
