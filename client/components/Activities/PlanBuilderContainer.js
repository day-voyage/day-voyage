import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { confirmPlan } from '../../redux/actions'
import { buildPlanner, getPlannerActivities } from '../../redux/reducers'
import PlanBuilder from './PlanBuilder'

class PlanBuilderContainer extends Component {
  render() {
    const { activities } = this.props

    return (
      <div className="col-md-4">
        <PlanBuilder
          activities={activities}
          onConfirmClicked={() => this.props.confirmPlan()} />
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
  { confirmPlan }
)(PlanBuilderContainer)
