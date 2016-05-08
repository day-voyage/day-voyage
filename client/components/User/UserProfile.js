import React, { Component, PropTypes } from 'react'

// username 
// profile picture
// list of itineraries that this user has created
// list of itineraries that this user has saved

export default class UserProfile extends Component {
  constructor(props) {
      super(props);

      this.state = {
        username: 'username',
        createdPlans: [],
        savedPlans: []
      };
    }
  render() {

    return (
      <div>
        
      </div>
    )
  }
}