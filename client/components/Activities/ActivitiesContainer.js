import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToBuilder } from '../../redux/actions'
import { getVisibleActivities } from '../../redux/reducers/activities.js'
import ActivityItem from './ActivityItem'
import ActivitiesList from './ActivitiesList'

class ActivitiesContainer extends Component {
  render() {
    console.log('here are the props', this.props);
    const { activities } = this.props
    return (
      <ActivitiesList title="Activities">
        {activities.map(activity =>
          <ActivityItem
            key={activity.id}
            activity={activity}
            onAddToBuilderClicked={() => this.props.addToBuilder(activity.id)} />
        )}
      </ActivitiesList>
    )
  }
}

ActivitiesContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: getVisibleActivities(state.activities)
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(ActivitiesContainer)