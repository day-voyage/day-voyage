import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, 
        changingRoutes,
        saveActivityToDb } from '../actions';
import ActivityItem from '../components/ActivityItem';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';

var shortid = require('shortid');


class ActivitiesContainer extends Component {

  render() {
    const { activities, auth } = this.props;
    const hasActivities = activities.length > 0;
    if (hasActivities && activities[0].distance) {
      activities.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance));
    }
    return (
      <Card>
        <h3 style={{marginLeft: 15}}>Activities</h3>
        {!hasActivities ? <em>0 search results</em> :
          activities.map((activity, index) => {
            if (activity.visArea && activity.visCuisine && activity.visBudget) {
              return <ActivityItem
                key={index}
                activity={activity}
                openSnackbar={this.props.openSnackbar}
                onAddToBuilderClicked={() => {
                  this.props.addToBuilder(activity);
                  this.props.saveActivityToDb(Object.assign(activity, {
                    isYelp: true,
                    user_gen: false,
                    clientside_id: shortid.generate()
                  }), auth.token.access_token);
                }}/>
            }
        })}
      </Card>
    )
  }
}

ActivitiesContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder,
    saveActivityToDb }
)(ActivitiesContainer)