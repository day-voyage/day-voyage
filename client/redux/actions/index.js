import plan from '../../api/plan.js';
import * as types from '../constants/ActionTypes.js';

function receiveActivities(activities) {
  return {
    type: types.RECEIVE_ACTIVITIES,
    activities: activities
  }
}

export function getAllActivities() {
  return dispatch => {
    plan.getActivities(activities => {
      dispatch(receiveActivities(activities))
    })
  }
}

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
 