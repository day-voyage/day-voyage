import React, { Component } from 'react';
// import ConfirmationContainer from './ConfirmationContainer';
import PlanBuilderContainer from '../Activities/PlanBuilderContainer';
import Maps from '../Helpers/Maps';

export default class Activities extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Maps size="large" />
          <PlanBuilderContainer />
        </div>
      </div> 
    );
  }


}
