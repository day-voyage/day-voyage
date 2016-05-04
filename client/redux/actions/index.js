import plan from '../../api/plan.js';
import * as types from '../constants/ActionTypes.js';
import { store } from '../../components/App.js';
var Yelp = require('yelp');

export function initApp() {
  return dispatch => {
    console.log('ready to receive activities');
  }
}

function receiveActivities(activities) {
  return {
    type: types.RECEIVE_ACTIVITIES,
    activities: activities
  }
}

export function getAllActivities(query, router) {

    fetch(`/api/yelpSearch?city=${query.city}&category=${query.category}`, {
      method: 'GET'
    })
    .then((results) => results.json()).then((data) => 
      console.log("yelp data:", data));
      fetch('https://sleepy-crag-32675.herokuapp.com/v1/activities', {
        method: 'GET'
      })
    .then((dbResults) => dbResults.json()).then((dbData) => store.dispatch(receiveActivities(dbData.data)))
    .then(() => {
      router.push('/activities');
    })
    .catch(e => console.log(e));
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
 