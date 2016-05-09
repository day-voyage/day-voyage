import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, changingRoutes } from '../../redux/actions';
import ActivityItem from './ActivityItem';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class ActivitiesContainer extends Component {

  render() {
    const { activities } = this.props;
    const hasActivities = activities.length > 0;
    const nodes = !hasActivities ?
      <em>0 search results</em> :
      <div>
        <div>
        {activities.map(activity => 
          <ActivityItem
            // key={activity.lat}
            activity={activity}
            onAddToBuilderClicked={() => {
              this.props.addToBuilder(activity) }}/>
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