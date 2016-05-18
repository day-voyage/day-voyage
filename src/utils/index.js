import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// createConstants creates a hash with all of the constants
/**
 * Creates hash of all constants
 * @param  {...String} constants [string describing action]
 * @return {Object}    [hash of constants]
 */
export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function isLoggedIn() {
  var token = localStorage.getItem('token');
  return !!token ? true : false;
}
/**
 * Composes a hash with reducer functions
 * @param  {Object} initialState
 * @param  {Object} reducerMap
 * @return {Object} hash with reducer functions by action
 */
export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}

/**
 * Checks status of API responses
 * @param  {Object} response
 * @return {Object} response || error
 */
export function checkHttpStatus(response) {
  //TODO: adjust the error that are being put onto the response object
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

/** Remove state if included with user input */
export function parseCity(cityInput) {
  return cityInput.replace(/,.*/, '');
}
// API helpers to communti

// export function updateActivity(activityID, updates, access_token) {
//   fetch(`https://sleepy-crag-32675.herokuapp.com/v1/activities/${activityID}?access_token=${access_token}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updates)
//   })
//   .then(parseJSON)
//   .then(response => cb(response))
//   .catch(err => console.log(`Error updating activities: ${err}`));
// }


// export function savePlanToDb(plan, access_token) {
//   return dispatch => {
//     return fetch('https://sleepy-crag-32675.herokuapp.com/v1/plans?access_token=' + access_token, {
//         method: 'POST',

//         headers: {
//             'Content-Type': 'application/json'
//         },
//             body: JSON.stringify(plan)
//         })
//         .then(checkHttpStatus)
//         .then(parseJSON)
//         .then(response => {
//             try {
//               dispatch(savePlanConfirm())
//             } catch (e) {
//               console.log(e);
//               snackbar('There was an error saving the plan');
//             }
//         })
//         .catch(error => {
//            console.log(error);
//         })
//     }
// }

// API requests

export function updateUser(userID, updates, cb) {
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/users/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error updating user: ${error}`))
}

export function deleteUser(userID, cb) {

  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/users/${userID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(error));

}


export function getActivitiesByUser(id, cb) {
  // console.log(`<><> getting activities for user_id ${id}`);
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/activities?user_id=${id}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities by userID: ${error}`));
}

export function getActivitiesUnderBudget(amount, cb) {
  console.log('getting activities under budget');
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/activities?costPerPerson__lte=${amount}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities under budget: ${error}`))
}

/**
 *  Search activities by category
 */

export function searchActivities(searchTerm, city, cb) {
  //TODO: maybe cache calls to a particular city
  // console.log('here in SearchActivities in utils', searchTerm, city);
  city = parseCity(city);

  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/activities?city__icontains=${city}&private__is=false&isYelp__is=false`)
    .then(parseJSON)
    .then(result => {
      let activities = result.data;
      let matchHash = Object.create(null);
      let query = new RegExp(searchTerm, 'gi');
      let matches = activities.filter((activity) => {
        let categoryString = activity.categories.join(',');
        return query.test(activity.desc) || query.test(categoryString) || query.test(activity.title);
        });
      matches.forEach((activity, i) => {
        matchHash[activity.title] = activity;
      });
      let uniqueMatches = [];
      for (const title in matchHash) {
        uniqueMatches.push(matchHash[title]);
      }
      cb(uniqueMatches);
      })
    .catch(error => console.log(error));

}

/**
 * Seach for plans
 * @param  {String}   searchTerm
 * @param  {String}   city
 * @param  {Function} cb
 */
export function searchPlans(searchTerm, city, cb) {
  city = parseCity(city);

  const reqBody = {
    city: city,
  };

  fetch(`/db/searchPlans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
    .then(parseJSON)
    .then(result => {
      let plans = result.data;
      let query = new RegExp(searchTerm, 'gi');
      let matchHash = Object.create(null);
      let matches = plans.filter((plan) => query.test(plan.desc) || query.test(plan.title));
      matches.forEach((plan, i) => {
        matchHash[plan.title] = plan;
      });
      let uniqueMatches = [];
      for (const title in matchHash) {
        uniqueMatches.push(matchHash[title]);
      }
      cb(matches);
      })
    .catch(error => console.log(error));

}


export function getAllPlans(cb) {
  fetch('https://sleepy-crag-32675.herokuapp.com/v1/plans')
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting all plans: ${error}`));
}

/**
 * Get all activities for a given plan
 * @param  {int}   planID
 * @param  {Function} cb
 */
export function getActivitiesByPlan(planID, cb) {
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/activities/?plan__plan_id=${planID}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities by planID: ${error}`));
}

/**
 * Get all plans for a given user
 * @param  {int}   userID
 * @param  {Function} cb
 */
export function getPlansByUser(userID, cb) {
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/plans?user_id=${userID}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting plans by userID: ${error}`));
}

/**
 * Get a single plan, including activities associated with plan
 * @param  {int}   planID
 * @param  {Function} cb
 */
export function getPlan(planID, cb) {
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/plans/${planID}`)
   .then(parseJSON)
   .then(data => {
      getComments('plan', planID, comments => {
        data.data[0].comments = comments.data;
        cb(data);
      });
    })
   .catch(error => console.log(error));
}

/**
 * Update plan
 * @param  {Int}   planID
 * @param  {Object}   planUpdates hash with plan updates
 * @param  {Array}   activities  array of activity ojects to update
 * @param  {Function} cb
 */
export function updatePlan(planID, planUpdates, activities, cb) {
  let token = localStorage.getItem('token');
  let access_token = JSON.parse(token).access_token;
  let reqBody = {
    plan: planUpdates,
    access_token: access_token,
    activities: activities,
    plan_id: planID
  };
  fetch(`db/updateplan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })
  .then(parseJSON)
  .then(data => cb(data))
  .catch(error => console.log(`Error updating plan: ${error}`))
}

/**
 * Create plan in db
 * @param  {object} plan       [object that matches plan schema]
 * @param  {Array} activities  [array of activity objects]
 * @param  {Function} cb
 */
export function createPlan(plan, activities, cb) {
  return dispatch => {
    let token = localStorage.getItem('token');
    let access_token = JSON.parse(token).access_token;
    let reqBody = {
      plan: plan,
      access_token: access_token,
      activities: activities
    };
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
    .then(() => dispatch(savePlanConfirm()))
    .catch(error => console.log(`Error creating plan: ${error}`))
  }
}

/**
 * Delete plan
 * @param  {int}   planID
 * @param  {Function} cb
 */
export function deletePlan(planID, cb) {
  fetch(`https://sleepy-crag-32675.herokuapp.com/v1/plans/${planID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(error));
}

/**
 * Run custom queries on tables
 * @param  {string}    table
 * @param  {Object}    queries attributes for object to match
 * @param  {Function}  cb
 */
export function queryTable(table, queries, cb) {
  let queryString = '?';
  let contains = '__icontains=';
  let is = '__is=';
  const keys = Object.keys(queries);
  keys.forEach((key, i) => {
    let queryValue = queries[key];
    if (typeof queryValue === 'string') {
      queryString+=`${key}${contains}${queryValue}`;
    } else {
      queryString+=`${key}${is}${queryValue}`;
    }
    if (!(i === keys.length - 1)) {
      queryString+='&'
    }
  });
  let url = `https://sleepy-crag-32675.herokuapp.com/v1/${table}${queryString}`;
  fetch(url)
    .then(parseJSON)
    .then(response => cb(response))
    .catch(error => console.log(error));
}

/**
 * Get comments from DB
 * @param  {String}   type user, activity, plan
 * @param  {int}   id   id of type
 * @param  {Function} cb   callback to execute with response
 */
export function getComments(type, id, cb) {
  let queryString = `?${type}_id=${id}`;
  let url = `https://sleepy-crag-32675.herokuapp.com/v1/comments${queryString}`;
  fetch(url)
    .then(parseJSON)
    .then(response => cb(response))
    .catch(error => console.log(error));
}

export function createComment(comment, cb) {
  let url = `https://sleepy-crag-32675.herokuapp.com/v1/comments`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
  .then(parseJSON)
  .then((response) => cb(response))
  .catch(error => console.log(error));
}


