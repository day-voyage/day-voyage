import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { confirmPlan, deleteFromBuilder } from '../../redux/actions'
import { buildPlanner, getPlannerActivities } from '../../redux/reducers'
import PlanBuilder from './PlanBuilder'
import PlanBuilderItem from './PlanBuilderItem'

class PlanBuilderContainer extends Component {
  render() {
    const { activities, onConfirmClicked } = this.props

    const hasActivities = activities.length > 0
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
      {activities.map(activity => 
        <PlanBuilderItem
          key={activity.title}
          activity={activity}
          onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity.title)} 
          onConfirmClicked={() => this.props.confirmPlan()} />
      )}
      </div>
    return (
      <div className="col-md-4">
      <h3>Itinerary</h3>
        {nodes}
      </div>
    )
  }
} 

PlanBuilderContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    // categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired
  })).isRequired,
  confirmPlan: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    activities: getPlannerActivities(state),
  }
}

export default connect(
  mapStateToProps,
  { confirmPlan, deleteFromBuilder }
)(PlanBuilderContainer)
