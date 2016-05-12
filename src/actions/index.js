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
  CHECK_AREA
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

export function saveToDb(activities) {
  return {
    type: SAVE_TO_DB,
    activities
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
  localStorage.setItem('token', token);
  snackbar("You have successfully logged in");
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

export function loginUser(username, password, redirect="/", snackbar) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://sleepy-crag-32675.herokuapp.com/v1/access_tokens', {
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
                    dispatch(push(redirect));
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
               console.log('>>>>', error);
               snackbar('The user name and password you have entered do not match our records');
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

export function signUpUser(username, password, email, redirect='/profile', snackbar) {
  // console.log(`username is ${username}\npassword is ${password}\nemail is ${email}`);
  return function(dispatch) {
    dispatch(signUpUserRequest());
    return fetch('http://sleepy-crag-32675.herokuapp.com/v1/users', {
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
          dispatch(loginUser(username, password, redirect));
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

