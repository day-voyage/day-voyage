import * as types from '../constants/ActionTypes.js';

export function addToBuilder(activityId) {
  return { 
    type: types.ADD_TO_BUILDER, 
    activityId
  }
}

export function deleteFromBuilder(activityId) {
  return {
    type: types.DELETE_FROM_BUILDER, 
    activityId
  }
}

export function confirmPlan(activities) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CONFIRM_REQUEST
    })
  }
}
