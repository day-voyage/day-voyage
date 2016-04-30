import * as types from '../constants/ActionTypes.js';

module.exports = {
  addToBuilder(activity) {
    return { type: types.ADD_TO_BUILDER, activity}
  },

  deleteFromBuilder(activity) {
    return {type: types.DELTE_FROM_BUILDER, activity}
  }
};
