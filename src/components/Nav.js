import React, { PropTypes, Component } from 'react';

import Login from './Login';

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    console.log('navbars context:', this.context);
    console.log('NavBars router:', this.context.router);
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
// Link to LoginView
// Link to ProfileView
