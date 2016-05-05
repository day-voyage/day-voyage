import React, { Component } from 'react';
import ConfirmationContainer from './ConfirmationContainer';
import Maps from '../Helpers/Maps';

export default class Activities extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <ConfirmationContainer />
          <Maps size="large" />
        </div>
      </div> 
    );
  }


}
