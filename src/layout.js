import React from 'react';
import NavHelper from './components/nav-helper';

export default React.createClass({
  displayName: 'Layout',
  render() {
    return (
      <NavHelper>
        <nav className='top-nav top-nav-light cf' role='navigation'>
          <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
          <label htmlFor='menu-toggle'>Menu</label>
          <ul className='list-unstyled list-inline cf'>
            <li>Labelr</li>
            <li><a href='/'>Filter</a></li>
            <li><a href='/'>Build Planner</a></li>
            <li className='pull-right'><a href='/'>Login</a></li>
            <li className='pull-right'><a href='/'>Logout</a></li>
          </ul>
        </nav>
        <div className='container'>
        {this.props.children}
        </div>
      </NavHelper>
    )
  }
})

export default React.createClass({
  displayName: 'Filter',
  render() {
    return (
      <NavHelper>


<div class="grid-flex-container">
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
  </div>
  <div class="grid-flex-container">
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
  </div>
  <div class="grid-flex-container">
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
    <div class="grid-flex-cell">
      <p>auto</p>
    </div>
  </div>


        <div className='container'>
        {this.props.children}
        </div>
      </NavHelper>
    )
  }
})