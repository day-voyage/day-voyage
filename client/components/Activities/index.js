import React, { Component } from 'react';
import FilterContainer from './FilterContainer';
import ActivitiesContainer from './ActivitiesContainer';
import PlanBuilderContainer from './PlanBuilderContainer';
import CreateActivity from './CreateActivity';



export default class Activities extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <FilterContainer />
          <ActivitiesContainer />
          <PlanBuilderContainer />
        </div>
      </div> 
    );
  }


}
