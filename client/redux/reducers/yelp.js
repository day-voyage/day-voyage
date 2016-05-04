import { combineReducers } from 'redux';
import { RECEIVE_YELPS, ADD_TO_BUILDER } from '../constants/ActionTypes';

function yelps(state, action) {
  switch (action.type) {
    case ADD_TO_BUILDER:
      return Object.assign({}, state, {
        added: true
      })
    default:
      return state
  }
}

function byYelpId(state = {}, action) {
  switch (action.type) {
    case RECEIVE_YELPS:
      return Object.assign({},
        state,
        action.yelps.reduce((obj, yelp) => {
          obj[yelp.id] = yelp
          return obj
        }, {})
      )
    default:
      const { yelpId } = action
      if (yelpId) {
        return Object.assign({}, state, {
          [yelpId]: yelps(state[yelpId], action)
        })
      }
      return state
  }
}

function visibleYelpIds(state = [], action) {
  switch (action.type) {
    case RECEIVE_YELPS:
      return action.yelps.map(yelp => yelp.id)
    default:
      return state
  }
}

export default combineReducers({
  byYelpId,
  visibleYelpIds
})

export function getYelp(state, id) {
  return state.byId[id]
}

export function getVisibleYelps(state) {
  return state.visibleYelpIds.map(id => getyelp(state, id))
}
