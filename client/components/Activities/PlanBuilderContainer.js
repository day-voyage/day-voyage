import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { confirmPlan } from '../../redux/actions'
import { buildPlanner } from '../../redux/reducers'
import PlanBuilder from './PlanBuilder'

class PlanBuilderContainer extends Component {
  render() {
    const { activities } = this.props

    return (
      <PlanBuilder
        activities={activities}
        onConfirmClicked={() => this.props.confirmPlan()} />
    )
  }
}

PlanBuilderContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
  })).isRequired,
  confirmPlan: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    activities: buildPlanner(state),
  }
}

export default connect(
  mapStateToProps,
  { confirmPlan }
)(PlanBuilderContainer)
