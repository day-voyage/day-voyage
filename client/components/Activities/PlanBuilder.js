import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import Activity from './Activity'

export default class PlanBuilder extends React.Component {
  render() {
    const { activities, onConfirmClicked } = this.props

    const hasActivities = activities.length > 0
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      activities.map(activity =>
        <Activity
          title={activity.title}
          categories={activity.categories}
          city={activity.city}
          key={activity.id}/>
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
 