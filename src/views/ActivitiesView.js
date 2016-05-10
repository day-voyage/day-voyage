import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import ActivitiesContainer from '../containers/ActivitiesContainer';
import FilterContainer from '../containers/Filter';
import PlanBuilderContainer from '../containers/PlanBuilderContainer';
import Snackbar from 'material-ui/Snackbar';
import Search from '../components/Search';

import {Tabs, Tab} from 'material-ui/Tabs';

import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';


export class ActivitiesView extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: '',
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
          <Search />
          <FilterContainer />
        </div>
        <div className="row">
          <div className="col-md-5">
            <Tabs>
             <Tab icon={<FontIcon className="material-icons">map</FontIcon>}
                  label="SEARCH">
                  <ActivitiesContainer
                    openSnackbar={this.initiateSnackbar.bind(this)} />
              </Tab>
              <Tab
                icon={<FontIcon className="material-icons">favorites</FontIcon>}
                label="FAVORITES">
                test test test
              </Tab>
              <Tab
                icon={<MapsPersonPin />}
                label="NEARBY">
              </Tab>
            </Tabs>
          </div>
          <div className="col-md-7">
            <PlanBuilderContainer
              openSnackbar={this.initiateSnackbar.bind(this)} />
            <Snackbar
              open={this.state.snackbar}
              message={this.state.message}
              autoHideDuration={2000} />
          </div>
       </div>
     </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    planBuilder: state.planBuilder
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesView);
