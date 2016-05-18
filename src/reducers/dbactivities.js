import { createReducer } from '../utils';
import { RECEIVE_DBACTIVITIES,
         DB_ADD_TO_BUILDER,
         DB_DELETE_FROM_BUILDER } from '../constants';
         // CHECK_NEIGHBORHOOD,
         // CHECK_CATEGORY,
         // CHECK_BUDGET } from '../constants';
import { pushState } from 'redux-router';


export default function dbactivities(state = [], action) {
  switch (action.type) {
    case RECEIVE_DBACTIVITIES:
      return action.activities;
    case DB_ADD_TO_BUILDER:
      action.activity.added = true;
      action.activity.icon = '';
      return state;
    case DB_DELETE_FROM_BUILDER:
      action.activity.added = false;
      action.activity.icon = 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0';
      return state;
    // case CHECK_NEIGHBORHOOD:
    //   var newState = state.slice()
    //   newState.forEach((activity) => {
    //     var isVisible = false;
    //     for (var i = 0; i < activity.neighborhood.length; i++) {
    //       if (action.neighborhoods.indexOf(activity.neighborhood[i].toUpperCase()) >= 0) {
    //         isVisible = true;
    //       }
    //     }
    //     activity.visArea = isVisible;
    //   })
    //   return newState;
    // case CHECK_CATEGORY:
    //   var newState = state.slice()
    //   newState.forEach((activity) => {
    //     var isVisible = false;
    //     for (var i = 0; i < activity.category.length; i++) {
    //       if (action.category.indexOf(activity.category[i].toUpperCase()) >= 0) {
    //         isVisible = true;
    //       }
    //     }
    //     activity.visCategory = isVisible;
    //   })
    //   return newState;
    // case CHECK_BUDGET:
    //   var newState = state.slice()
    //   newState.forEach((activity) => {
    //     var isVisible = false;
    //     if (action.budget > activity.budget) {
    //       isVisible = true;
    //     }
    //     activity.visBudget = isVisible
    //   })
    //   return newState;
    default:
      return state;
  }
}
