import React, { Component, PropTypes } from 'react'

export default class Activity extends Component {
  render() {
    const { title, categories, location } = this.props
    return <div> {title} - {categories} {location } </div>
  }
}

Activity.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  city: PropTypes.string
}
