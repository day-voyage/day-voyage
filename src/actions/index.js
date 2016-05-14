import { checkHttpStatus, parseJSON } from '../utils';
import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  RECEIVE_ACTIVITIES,
  RECEIVE_YELPS,
  CONFIRM_REQUEST,
  REORDER_UP,
  REORDER_DOWN,
  SAVE_TO_DB,
  CHANGE_ROUTES,
  RECEIVE_ROUTES,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER,
  FETCH_PROTECTED_DATA_REQUEST,
  RECEIVE_PROTECTED_DATA,
  CHECK_AREA,
  EDIT_DESC,
  SAVE_CONFIRM_DB,
  DELETE_CONFIRM_DB
} from '../constants';
import { push } from 'redux-router';
import { store } from '../index.js';

export function initApp() {
  return dispatch => {
    console.log('ready to receive activities');
  };
}

export function receiveActivities(activities) {
  return {
    type: RECEIVE_ACTIVITIES,
    activities
  }
}

export function receiveRoutes(route) {
  return {
    type: RECEIVE_ROUTES,
    directions: route
  };
}

export function changeRoutes(route) {
  return {
    type: CHANGE_ROUTES,
    directions: route
  };
}

/**
 * Get Yelp search results
 */
export function getAllActivities(query, location) {
  return (dispatch) => {
    /**
    * do Yelp search based on query city (may be geolocation or typed in) and category
    */
    fetch(`/api/yelpSearch?city=${query.city}&category=${query.category}`, {
      method: 'GET'
    })
    .then((yelpResults) => yelpResults.json())
    .then((yelpData) => {
      /**
      * transform data to correct format for activities
      */
      var withoutLocation = yelpData.map((activity, i) => {
        let transformed = Object.create(null);
        transformed.title = activity.name;
        transformed.category = activity.categories[0];
        transformed.desc = activity.snippet_text;
        transformed.lat = activity.location.coordinate.latitude;
        transformed.long = activity.location.coordinate.longitude;
        transformed.address = activity.location.address[0];
        transformed.city = activity.location.city;
        transformed.state = activity.location.state_code;
        transformed.neighborhood = activity.location.neighborhoods;
        transformed.added = false;
        transformed.icon = 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0';
        transformed.visible = true;
        transformed.notes= '';
        return transformed;
      });
      return withoutLocation;
    })
    .then((noLocation) => {
      /**
      * if current location was included
      */
      if (location !== null) {
        /**
        * check distances of all activities from current location using Google distance matrix api
        */
        var coords = noLocation.slice().map((info) => {
          return [info.lat, info.long].join('%2C');
        }).join('%7C');
        fetch(`/api/distancematrix?location=${location.lat+','+location.lng}&results=${coords}`, {
          method: 'GET'
        }).then((distanceResults) => distanceResults.json())
        .then((distances) => {
          /**
          * add distance key to each activity
          */
          var withLocation = noLocation.map((activity, i) => {
            activity.distance = distances[i];
            return activity;
          });
          /**
          * dispatch activities with new distance key
          */
          dispatch(receiveActivities(withLocation));
        })
        .then(() => {
          /**
          * route to activities page
          */
          dispatch(push('/activities'));
        })
        .catch(e => console.log(e));
      /**
      * otherwise if no location is set, just dispatch activities without distance
      */
      } else {
        dispatch(receiveActivities(noLocation));
      }
    })
    .then(() => {
      if (location === null) {
        dispatch(push('/activities'));
      }
    })
    .catch(e => console.log(e));
  };
}

export function addToBuilder(activity) {
  return {
    type: ADD_TO_BUILDER,
    activity
  };
}

export function deleteFromBuilder(activity) {
  return {
    type: DELETE_FROM_BUILDER,
    activity
  };
}

export function goToConfirm() {
  return dispatch => {
    dispatch(push('/confirm'));
  }
}

export function reorderUp(activityIndex) {
  return {
    type: REORDER_UP,
    activityIndex
  };
}

export function reorderDown(activityIndex) {
  return {
    type: REORDER_DOWN,
    activityIndex
  };
}

// map stuff
export function changingRoutes(activities) {
    const DirectionsService = new google.maps.DirectionsService();

    if (activities.length === 0) {
      return dispatch(changeRoutes(null));
    }

    var places = activities.map(function(item) {
      return {position: {location: {lat: parseFloat(item.lat), lng: parseFloat(item.long) }}, title: item.title, icon: item.icon, address: [item.address, item.city, item.state].join(', ') };
    });

    DirectionsService.route(
      {
        origin: places[0].address,
        destination: places[places.length-1].address,
        waypoints: places.slice(1,-1).map((item) => item.position),
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          return store.dispatch(changeRoutes(result));
        } else {
          console.error(`error fetching directions ${ result }`);
          return store.dispatch(changeRoutes(null));
        }
    });
}


export function loginUserSuccess(token, snackbar) {
  localStorage.setItem('token', JSON.stringify(token));
  if (snackbar) {
    snackbar("You have successfully logged in");
  }
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  console.log(error);
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
      type: LOGOUT_USER
    }
}

// pay attention to this fn signature...
// appear returns a function that takes dispatch as a param
export function logoutAndRedirect(snackbar) {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/'));
        snackbar("You have successfully logged out");
    }
}

export function loginUser(username, password, snackbar) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://localhost:8080/v1/access_tokens', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password,grant_type: 'password'})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.data[0], snackbar));
                } catch (e) {
                    console.log(e);
                    snackbar('The user name and password you have entered do not match our records');
                    dispatch(loginUserFailure({
                        response: {
                          status: 403,
                          statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
               // snackbar('The user name and password you have entered do not match our records');
               let response = {
                status: 401,
                statusText: `Unauthorized`
               };
               let resError = Object.assign({}, {
                response: response
              });
               dispatch(loginUserFailure(resError));
            })
    }
}

export function signUpUser(username, password, email, snackbar) {
  // console.log(`username is ${username}\npassword is ${password}\nemail is ${email}`);
  return function(dispatch) {
    dispatch(signUpUserRequest());
    return fetch('http://localhost:8080/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      try {
          dispatch(loginUser(username, password));
        } catch (e) {
          snackbar('Please enter a valid username, password, or email');
          dispatch(signUpUserFailure({
            response: {
              status: 403,
              statusText: `Error Signing Up`
            }
          }));
        }
      })
    .catch(error => {
      snackbar('Please enter a valid username, password, or email');
      let response = {
        status: 401,
        statusText: `Error with sign up request`
      };
      let resError = Object.assign({}, {
        response: response
      });
      dispatch(signUpUserFailure(resError));
    })
  }
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function signUpUserRequest() {
  return {
    type: SIGNUP_USER_REQUEST
  }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    // return (dispatch, state) => {
    //     dispatch(fetchProtectedDataRequest());
    //     return fetch('http://localhost:8080/v1/plans', {
    //             credentials: 'include',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         .then(checkHttpStatus)
    //         .then(parseJSON)
    //         .then(response => {
    //             dispatch(receiveProtectedData(response.data));
    //         })
    //         .catch(error => {
    //             if(error.response.status === 401) {
    //               dispatch(loginUserFailure(error));
    //               dispatch(push('/login'));
    //             }
    //         })
    //    }
}

export function checkArea(neighborhoods) {
  return {
    type: CHECK_AREA,
    neighborhoods
  }
}

export function saveConfirm() {
  return {
    type: SAVE_CONFIRM_DB
  }
}

export function deleteConfirm() {
  return {
    type: DELETE_CONFIRM_DB
  }
}

export function saveActivityToDb(activity, access_token) {
  return dispatch => {

    return fetch('http://localhost:8080/v1/activities?access_token=' + access_token, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(activity)
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            try {
              dispatch(saveConfirm())
            } catch (e) {
              console.log(e);
              snackbar('There was an error saving the activity');
            }
        })
        .catch(error => {
           console.log(error);
        })
    }
}

export function deleteActivityFromDb(activityId, access_token) {
  return dispatch => {

    return fetch('http://localhost:8080/v1/activities?access_token=' + access_token, {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({activity_id: activityId})
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            try {
              dispatch(deleteConfirm())
            } catch (e) {
              console.log(e);
              snackbar('There was an error deleting the activity');
            }
        })
        .catch(error => {
           console.log(error);
        })
    }
}

export function savePlannerToDb(plan, access_token) {
  return dispatch => {
    return fetch('http://localhost:8080/v1/activities?access_token=' + access_token, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(activity)
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            try {
              dispatch(saveConfirm())
            } catch (e) {
              console.log(e);
              snackbar('There was an error saving the activity');
            }
        })
        .catch(error => {
           console.log(error);
        })
    }
}




export function editDescription(activityIndex, text) {
  return {
    type: EDIT_DESC,
    activityIndex: activityIndex,
    text: text
  }
}


export function unCheckCity(city) {
  return {
    type: UNCHECK_CITY,
    city
  }
}

// API requests

export function updateUser(userID, updates, cb) {
  fetch(`http://localhost:8080/v1/users/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
  .then(parseJSON)
  .then(response => cb(response))
  .catch(err => console.log(`Error updating user: ${err}`))
}


export function getActivitiesByUser(id, cb) {
  // console.log(`<><> getting activities for user_id ${id}`);
  fetch(`http://localhost:8080/v1/activities?user__id=${id}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(err => console.log(`Error getting activities by userID: ${err}`));
}

export function getActivitiesUnderBudget(amount, cb) {
  console.log('getting activities under budget');
  fetch(`http://localhost:8080/v1/activities?costPerPerson__lte=${amount}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(err => console.log(`Error getting activities under budget: ${err}`))
}

/**
 *  Search activities by category
 */

export function searchActivities(searchTerm, city, cb) {
  fetch(`http://localhost:8080/v1/activities?categories__icontains=${searchTerm}&city__icontains=${city}`)
    .then(parseJSON)
    .then(response => cb(response))
    .catch(err => console.log(`Error searching activities: ${err}`));
}
//TODO: perhaps do separate requests and keep only unique ids
//maybe use a hash or a set
//save to a search cache?

export function updateActivity(activityID, cb) {
  fetch(`http://localhost:8080/v1/activities/${activityID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
  .then(parseJSON)
  .then(response => cb(response))
  .catch(err => console.log(`Error updating activities: ${err}`));
}

export function deleteActivity(activityID, cb) {
  fetch(`http://localhost:8080/v1/activities/${activityID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(parseJSON)
  .then(response => {
    console.log('response in delete activity:', response);
    cb(response);
  })
  .catch(error => console.log(`Error deleting activity: ${error}`));
}
/*
   Get all plans from database
 */
export function getAllPlans(cb) {
  fetch('http://localhost:8080/v1/plans')
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting all plans: ${err}`));
}

export function getActivitiesByPlan(planID, cb) {
  fetch(`http://localhost:8080/v1/activities/?plan__plan_id=${planID}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities by planID: ${err}`));
}

export function getPlansByUser(id, cb) {
  fetch(`http://localhost:8080/v1/plans?user__id=${id}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting plans by userID: ${err}`));
}

// TODO: update activities in plan, join?
export function updatePlan(planID, planUpdates, activities, cb) {
  // add activities to plan
  let token = localStorage.getItem('token');
  let access_token = JSON.parse(token).access_token;
  // let updates = Object.assign({}, planUpdates, {activities: activities});
  // console.log(updates);
  let reqBody = {
    plan: planUpdates,
    access_token: access_token,
    activities: activities,
    plan_id: planID
  };
  console.log('about to send req body to server:',reqBody);
  fetch(`db/updateplan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  .then(parseJSON)
  .then(data => cb(data))
  .catch(error => console.log(`Error updating plan: ${err}`))
}

/**
 * [createPlan description]
 * @param  {[type]} plan       [object]
 * @param  {[type]} activities [an array of activity objects, include any properties to be updated]
 * @return {[type]}            [promise with response from db]
 */
export function createPlan(plan, activities, cb) {
  let token = localStorage.getItem('token');
  let access_token = JSON.parse(token).access_token;
  console.log(access_token);
  let reqBody = {
    plan: plan,
    access_token: access_token,
    activities: activities
  };
  // console.log('<><><> reqbody in client createPlan:\n',reqBody);
  fetch(`/db/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    .then(parseJSON)
    .then(response => {
      cb(response);
  })
    .catch(error => console.log(`Error creating plan: ${err}`))
}

// getYelpActivities

// getUserGeneratedActivities

//
// get

export function testPlan() {
    return (dispatch) => {
        dispatch(push('/plan/1'));
    }
}

// TODO: helper to build query String




