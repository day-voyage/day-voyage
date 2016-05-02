import React, { Component, PropTypes } from 'react'
import Activity from './Activity'

export default class ActivityItem extends Component {
  render() {
    const { activity } = this.props

    return (
      <div
        style={{ marginBottom: 20 }}>
        <Activity
          title={activity.title}
          categories={product.categories}
          location={product.location} />
        <button
          onClick={this.props.onAddToBuilderClicked}>
        </button>
      </div>
    )
  }
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}
