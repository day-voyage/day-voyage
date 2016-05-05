import React, { Component, PropTypes } from 'react'

export default class ActivityItem extends Component {
  render() {
    const { activity } = this.props

    return (
      <div
        style={{ marginBottom: 20,
                borderStyle: "solid",
                borderWidth: "2px" }}>
        <div> {activity.title} - {activity.desc} {activity.location } </div>

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
    desc: PropTypes.string.isRequired,
    // categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}
