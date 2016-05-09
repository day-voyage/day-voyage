import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CreateActivity from '../components/CreateActivity';
import ActivityItem from '../components/ActivityItem';
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
            openSnackbar={this.props.openSnackbar}
            onAddToBuilderClicked={() => {
              this.props.actions.addToBuilder(activity) }}/>
        )}
        </div>
      </div>


    return (
      <div className="col-md-6">
        <Card>
          <h3 style={{marginLeft: 15}}>Activities</h3>
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

