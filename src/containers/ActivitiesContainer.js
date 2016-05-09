import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CreateActivity from '../components/CreateActivity';
import ActivityItem from '../components/ActivityItem';
import ActivitiesList from '../components/ActivityList';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    // console.log(this.props);
    const { activities } = this.props;
    let allActivities = activities.activities;
    console.log('allActivities: >>', allActivities);
    const hasActivities = allActivities.length > 0;
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {allActivities.map(activity =>
          <ActivityItem
            // key={activity.lat}
            activity={activity}
            openSnackBar={this.props.openSnackBar}
            onAddToBuilderClicked={() => {
              this.props.actions.addToBuilder(activity) }}/>
        )}
        </div>
      </div>


    return (
      <div className="col-md-6">
        <Card>
          <CreateActivity
            modal={this.state.modalOpen}
            toggleModal={this.toggleModal.bind(this)}
            addFromCreate={(created) => this.props.actions.addToBuilder(created)}/>
          <h3 style={{marginLeft: 15}}>Activities</h3>
          <FlatButton
            label="Create New Activity"
            onClick={this.toggleModal.bind(this)} />
          {nodes}
        </Card>
      </div>
    )
  }
}

// ActivitiesContainer.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     city: PropTypes.string
//   })).isRequired,
//   addToBuilder: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
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
)(ActivitiesContainer);

