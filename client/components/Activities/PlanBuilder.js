import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class PlanBuilder extends React.Component {
  render() {
    const { activities, onConfirmClicked } = this.props

    const hasActivities = activities.length > 0
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      activities.map(activity =>
        <div key={activity.title}>
          {activity.title} - {activity.desc} {activity.city}
        </div>
    )
    return (
      <div className="col-md-4">
        <h3>Your Itinerary</h3>
        <div>{nodes}</div>
        <button onClick={onConfirmClicked}
          disabled={hasActivities ? '' : 'disabled'}>
          Confirm
        </button>
      </div>
    );
  }
};

PlanBuilder.propTypes = {
  activities: PropTypes.array,
  onConfirmClicked: PropTypes.func
};
 