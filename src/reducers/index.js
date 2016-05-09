import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from './auth';
import data from './data';
import activities from './activities';
import map from './map';
import planBuilder from './planBuilder';

export default combineReducers({
 auth,
 data,
 activities,
 map,
 planBuilder,
 router: routerStateReducer
});
