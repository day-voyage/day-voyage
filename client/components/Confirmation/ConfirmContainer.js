import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { saveToDb } from '../../redux/actions'
import { getConfirmActivities } from '../../redux/reducers/'
import ConfirmItem from './ConfirmItem'

class ConfirmContainer extends Component {

  render() {
    const { activities } = this.props
    console.log('here are the activities ', activities);
    return (
      <div>
        <div>
        {activities.map(activity => 
          <ConfirmItem
            key={activity.title}
            activity={activity}/>
        )}
        </div>
        <button
          onClick={() => this.props.saveToDb(activities)}>
          Save Itinerary
        </button>
      </div>
    )
  }

}

ConfirmContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    // categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired
  })).isRequired,
  saveToDb: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log('here is the state ', state);
  return {
    activities: getConfirmActivities(state.confirmation),
  }
}

export default connect(
  mapStateToProps,
  { saveToDb }
)(ConfirmContainer)