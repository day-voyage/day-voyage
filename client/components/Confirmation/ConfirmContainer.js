import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { saveToDb, reorderUp, reorderDown } from '../../redux/actions'
import { getConfirmActivities } from '../../redux/reducers/'
import ConfirmItem from './ConfirmItem'

class ConfirmContainer extends Component {

  render() {
    const { activities } = this.props
    return (
      <div className="col-md-4">
        <div>
        {activities.map(activity => 
          <ConfirmItem
            key={activity.title}
            activity={activity}
            onMoveUpClicked={() => this.props.reorderUp(activities.indexOf(activity))}
            onMoveDownClicked={() => this.props.reorderDown(activities.indexOf(activity))}/>
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
  return {
    activities: state.confirmation,
  }
}

export default connect(
  mapStateToProps,
  { saveToDb, reorderUp, reorderDown }
)(ConfirmContainer)