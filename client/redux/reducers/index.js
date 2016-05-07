import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { planBuilder } from './planBuilder';
import { directions } from './map';
import { activities, getActivity } from './activities';
 
export default combineReducers({
  planBuilder,
  activities,
  directions,
  routing: routerReducer
});