import React, { Component, PropTypes } from 'react'

export default class ConfirmItem extends Component {
  render() {
    const { activity } = this.props

    return (
      <div
        style={{ marginBottom: 20,
                borderStyle: "solid",
                borderWidth: "2px" }}>
        <div> {activity.title} - {activity.desc} {activity.location } </div>
      </div>
    )
  }
}

ConfirmItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    // categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
  }).isRequired
}
