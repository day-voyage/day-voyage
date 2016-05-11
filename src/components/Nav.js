import React, { PropTypes, Component } from 'react';

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div className="container">
        <div className="row">

        </div>
      </div>

    );
  }
}

//TODO: Nav should have Links to different Views
// Search
// Activities
// Plans
// Link to ProfileView
