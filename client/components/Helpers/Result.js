import React, { Component, PropTypes } from 'react';

export default class Result extends Component {
  render() {
    const { title, categories, location } = this.props
    return <div> {title} - {categories} {location } </div>
  }
}

Result.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  location: PropTypes.object
}
