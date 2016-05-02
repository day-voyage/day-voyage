import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToBuilder } from '../../redux/actions'
// import { getVisibleProducts } from '../reducers/products'
import ActivityItem from './ActivityItem'
import ActivitiesList from './ActivitiesList'

class ActivitiesContainer extends Component {
  render() {
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
    location: PropTypes.object.isRequired
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: getVisibleProducts(state.products)
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(ActivitiesContainer)