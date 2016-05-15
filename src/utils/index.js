import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// createConstants creates a hash with all of the constants
export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}

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

// API helpers to communti

// export function updateActivity(activityID, updates, access_token) {
//   fetch(`http://localhost:8080/v1/activities/${activityID}?access_token=${access_token}`, {
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
//     return fetch('http://localhost:8080/v1/plans?access_token=' + access_token, {
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
  fetch(`http://localhost:8080/v1/users/${userID}`, {
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

  fetch(`http://localhost:8080/v1/users/${userID}`, {
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
  fetch(`http://localhost:8080/v1/activities?user__id=${id}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities by userID: ${error}`));
}

export function getActivitiesUnderBudget(amount, cb) {
  console.log('getting activities under budget');
  fetch(`http://localhost:8080/v1/activities?costPerPerson__lte=${amount}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities under budget: ${error}`))
}

/**
 *  Search activities by category
 */

export function searchActivities(searchTerm, city, cb) {
  //TODO: maybe cache calls to a particular city

  fetch(`http://localhost:8080/v1/activities?city__icontains=${city}`)
    .then(parseJSON)
    .then(result => {
      let activities = result.data;
      let query = new RegExp(searchTerm, 'gi');
      let matches = activities.filter((activity) => {
        let categoryString = activity.categories.join(',');
        return query.test(activity.desc) || query.test(categoryString) || query.test(activity.title);
        });
      cb(matches);
      })
    .catch(error => console.log(error));

}

export function searchPlans(searchTerm, city, cb) {

  fetch(`http://localhost:8080/v1/plans?city__icontains=${city}`)
    .then(parseJSON)
    .then(result => {
      let plans = result.data;
      let query = new RegExp(searchTerm, 'gi');
      let matches = plans.filter((plan) => query.test(plan.desc) || query.test(plan.title));
      cb(matches);
      })
    .catch(error => console.log(error));

}
/*
   Get all plans from database
 */
export function getAllPlans(cb) {
  fetch('http://localhost:8080/v1/plans')
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting all plans: ${error}`));
}

export function getActivitiesByPlan(planID, cb) {
  fetch(`http://localhost:8080/v1/activities/?plan__plan_id=${planID}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting activities by planID: ${error}`));
}

export function getPlansByUser(userID, cb) {
  fetch(`http://localhost:8080/v1/plans?user__id=${userID}`)
  .then(parseJSON)
  .then(response => cb(response))
  .catch(error => console.log(`Error getting plans by userID: ${error}`));
}

export function getPlanWithActivities(planID, cb) {
  fetch(`http://localhost:8080/v1/plans/${planID}`)
   .then(parseJSON)
   .then(data => {
      getActivitiesByPlan(planID, (activityData) => {
        let plan = {
          plan: data.data[0],
          activities: activityData.data
        };
        cb(plan);
      });
   })
   .catch(error => console.log(error));
}

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


export function deletePlan(planID, cb) {
  fetch(`http://localhost:8080/v1/plans/${planID}`, {
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
 * [queryTable description]
 * @param  {[type]}   table   [description]
 * @param  {[type]}   queries [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
export function queryTable(table, queries, cb) {
  let queryString = '?';
  let contains = '__icontains='
  let is = '__is=';
  var keys = Object.keys(queries);
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
  let url = `http://localhost:8080/v1/${table}${queryString}`;
  fetch(url)
    .then(parseJSON)
    .then(response => cb(response))
    .catch(error => console.log(error));
}


export function getComments(type, id, cb) {
  let queryString = `?${type}_id=${id}`;
  let url = `http://localhost:8080/v1/comments${queryString}`;
  fetch(url)
    .then(parseJSON)
    .then(response => cb(response))
    .catch(error => console.log(error));
}
