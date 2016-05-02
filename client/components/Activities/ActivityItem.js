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
          onClick={this.props.onAddToBuilderClicked}
          disabled={product.added ? 'disabled' : ''}>
          {product.added ? 'Added' : 'Add to itinerary'}
        </button>
      </div>
    )
  }
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    added: PropTypes.bool.isRequired
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}
