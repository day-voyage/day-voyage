import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, changingRoutes } from '../actions';
import ActivityItem from '../components/ActivityItem';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';


class ActivitiesContainer extends Component {
  render() {
    const { activities } = this.props;
    const hasActivities = activities.length > 0;
    
    return (
      <Card>
        <h3 style={{marginLeft: 15}}>Activities</h3>
        {!hasActivities ? <em>0 search results</em> :
          activities.map((activity, index) =>
            if (activity.visible) {
              <ActivityItem
                key={index}
                activity={activity}
                openSnackbar={this.props.openSnackbar}
                onAddToBuilderClicked={() => {
                  this.props.addToBuilder(activity) }}/>
            }
        )}
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
    activities: state.activities
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(ActivitiesContainer)