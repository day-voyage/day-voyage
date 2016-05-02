import * as React from 'react';
import { Link } from 'react-router';

export default class Confirmation extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Confirmation Page</h1>
        <button><Link to="/">Go to home page</Link></button>
      </div>
    );
  }
}
