import React, { Component, PropTypes } from 'react';

export default class Filter extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  move() {
    this.context.router.push('/confirmation');

  }

  render() {
    return (
      <div className="col-md-2">
      </div>
    );
  }
}
