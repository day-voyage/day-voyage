import React, { Component, PropTypes } from 'react'

export default class ActivityItem extends Component {
  render() {
    const { activity } = this.props

    return (
      <div
        style={{ marginBottom: 20 }}>
        <div> {activity.title} - {activity.categories} {activity.location } </div>

        <button
          onClick={this.props.onAddToBuilderClicked}
          disabled={activity.added ? 'disabled' : ''}>
          {activity.added ? 'Added' : 'Add to itinerary'}
        </button>
      </div>
    )
  }
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}
