import plan from '../../api/plan.js';
import * as types from '../constants/ActionTypes.js';
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

export function getAllActivities(query) {
  return dispatch => {
    // plan.getActivities(activities => {
    //   dispatch(receiveActivities(activities))
    // })

    var yelp = new Yelp({
      consumer_key: yelpAPIKey.key,
      consumer_secret: yelpAPIKey.keySecret,
      token: yelpAPIKey.token,
      token_secret: yelpAPIKey.tokenSecret
    });

    yelp.search({ term: query.category, location: query.city })
    .then(function (data) {
      console.log('this is the yelp data: ', data);
      dispatch(receiveActivities(data));
    })
    .catch(function (err) {
      console.error(err);
    });

    // console.log('inside getAllActivities');
    // fetch(`/api/yelpSearch?city=${query.city}&category=${query.category}`, {
    //   method: 'GET'
    // })
    // .then((results) => results.json()).then((data) => 
    //   console.log("yelp data:", data));
    //   fetch('http://localhost:3000/v1/activities', {
    //     method: 'GET'
    //   })
    //   .then((dbResults) => dbResults.json()).then((dbData) => dispatch(receiveActivities(dbData)))
    // .catch(e => console.log(e));

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
 