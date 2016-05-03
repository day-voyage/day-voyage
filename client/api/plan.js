/**
 * Mocking client-server processing
 */
import _activities from './activities.json'
import { browserHistory } from 'react-router';

// const _activities;
const TIMEOUT = 100;

//var query = this.props.location.query

// fetch(`/api/yelpSearch?city=${this.state.city}&category=${this.state.category}`, {
//   method: 'GET'
// })
// .then((results) => results.json()).then((data) => 
//   console.log("yelp data:", data));
//   fetch('http://localhost:3000/v1/activities', {
//     method: 'GET'
//   })
//   .then((dbResults) => dbResults.json()).then((dbData) => _activities = dbData)
// .catch(e => console.log(e));


export default {
  getActivities(cb, timeout) {
    setTimeout(() => cb(_activities), timeout || TIMEOUT)
  }
}

