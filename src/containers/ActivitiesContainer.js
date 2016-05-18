import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, 
        changingRoutes } from '../actions';
import ActivityItem from '../components/ActivityItem';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';


class ActivitiesContainer extends Component {
  render() {
    const { activities, auth } = this.props;
    const hasActivities = activities.length > 0;
    if (hasActivities && activities[0].distance) {
      activities.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance));
    }
    return (
      <div>
        <h3 style={{marginLeft: 15}}>Yelp Results</h3>
        <Card>
          {!hasActivities ? <em>0 search results</em> :
            activities.map((activity, index) => {
              if (activity.visArea && activity.visCategory && activity.visBudget) {
                return <ActivityItem
                  key={index}
                  activity={activity}
                  openSnackbar={this.props.openSnackbar}
                  onAddToBuilderClicked={() => {
                    this.props.addToBuilder(activity);
                  }}/>
              }
          })}
        </Card>
      </div>
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
  { addToBuilder }
)(ActivitiesContainer)