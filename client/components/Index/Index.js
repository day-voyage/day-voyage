import * as React from 'react';
import { Link } from 'react-router';

import Search from './Search';

export default class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Search />
      </div>
    );
  }
}
