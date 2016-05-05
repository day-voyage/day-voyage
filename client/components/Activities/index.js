import React, { Component } from 'react'
import Filter from './Filter';
import ActivitiesContainer from './ActivitiesContainer';
import PlanBuilderContainer from './PlanBuilderContainer';

export default class Activities extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Filter />
          <ActivitiesContainer />
          <PlanBuilderContainer />
        </div>
      </div> 
    );
  }


}
