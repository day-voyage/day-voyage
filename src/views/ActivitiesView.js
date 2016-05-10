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
      value: 'a'
    };
  }

  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(function() {
      that.setState({snackbar: false});
    }, 2000);
  }

  handleChangeA(value) {
     this.setState({
       value: 'a',
     });
   };

  handleChangeB(value) {
     this.setState({
       value: 'b',
     });
   };

   handleChangeC(value) {
      this.setState({
        value: 'c',
      });
    };


  render() {
    return (
      <div className="container">
        <div className="row">
          <Search />
          <FilterContainer />
        </div>
        <div className="row">
          <div className="col-md-5">
            <Tabs 
              value={this.state.value}>
             <Tab 
                value="a"
                icon={<FontIcon className="material-icons">Map</FontIcon>}
                label="SEARCH"
                onClick={this.handleChangeA.bind(this)}>
                  <ActivitiesContainer
                    openSnackbar={this.initiateSnackbar.bind(this)} />
              </Tab>
              <Tab
                value="b"
                icon={<FontIcon className="material-icons">Favorites</FontIcon>}
                label="FAVORITES"
                onClick={this.handleChangeB.bind(this)}>
                test test test
              </Tab>
              <Tab
                value="c"
                icon={<MapsPersonPin />}
                label="NEARBY"
                onClick={this.handleChangeC.bind(this)}>
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
