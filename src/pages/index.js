import React from 'react';
import NavHelper from '../components/nav-helper';

export default React.createClass({
  displayName: 'IndexPage',

  render () {
    return (
      <NavHelper className='container'>
        <header role='banner'>
        <h1>Planr</h1>
        </header>
        <div>
          <p>Planning a meal, night on the town or sighseeing?</p>
          <form>
            <input type="text" placeholder="...Search goes here"></input>
            <a href='/search' className='button button-large'>
            <span>Search</span>
            </a>
          </form>
        </div>
      </NavHelper>
    )
  }
})