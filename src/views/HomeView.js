import React, { Component } from 'react';
import { Link } from 'react-router';
import Search from '../components/Search';


export default class HomeView extends Component {

  render () {
    return (
      <div className="home">
        <h1 className="home__tagline">Where will your day take you?</h1>
        <Search />
      </div>
    );
  }

}
