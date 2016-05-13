import React, { Component } from 'react';
import { Link } from 'react-router';
import Search from '../components/Search';

export default class HomeView extends Component {

  render () {
    return (
      <div>
        <h1>GoodTimes</h1>
        <p><Link to='/activities'>My smooth moves</Link></p>
        <Search />
      </div>
    );
  }

}
