import React, { Component } from 'react';
import FilterContainer from './FilterContainer';
import ActivitiesContainer from './ActivitiesContainer';
import PlanBuilderContainer from './PlanBuilderContainer';
import CreateActivity from './CreateActivity';
import Snackbar from 'material-ui/Snackbar';

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: ''
    };
  }

  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(function() {
      that.setState({snackbar: false});
    }, 2000);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <FilterContainer />
          <ActivitiesContainer 
            openSnackbar={this.initiateSnackbar.bind(this)}/>
          <PlanBuilderContainer 
            openSnackbar={this.initiateSnackbar.bind(this)}/>
          <Snackbar
            open={this.state.snackbar}
            message={this.state.message}
            autoHideDuration={2000}
          />
        </div>
      </div> 
    );
  }


}
