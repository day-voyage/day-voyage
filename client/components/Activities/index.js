import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addToBuilder, deleteFromBuilder } from '../../redux/actions';
import ActivitiesContainer from './ActivitiesContainer';
import PlanBuilderContainer from './PlanBuilderContainer';

import Filter from './Filter';
import PlanBuilder from './PlanBuilder';

export default class Activities extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Filter />
          <div className="col-md-4">
            <h1>Activities Page</h1>
            <ActivitiesContainer />
            <button><Link to="/confirmation">go to confirmation page</Link></button>
          </div>
            <PlanBuilderContainer />
        </div>
      </div>
    );
  }


}
