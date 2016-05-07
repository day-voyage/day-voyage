import React, { Component } from 'react';
import ConfirmContainer from './ConfirmContainer';
import Maps from '../Helpers/Maps';

export default class Activities extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Maps size="large" />
          <ConfirmContainer />
        </div>
      </div> 
    );
  }


}
