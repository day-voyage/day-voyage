import * as React from 'react';

import Title from './Title';
import Login from './Login';

export default class Nav extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Title />
          <Login />
        </div>
      </div>

    );
  }
}
