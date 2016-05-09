import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, changingRoutes } from '../../redux/actions';
import CreateActivity from './CreateActivity';
import ActivityItem from './ActivityItem';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


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
    const hasActivities = activities.length > 0;
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
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
          <CreateActivity 
            modal={this.state.modalOpen} 
            toggleModal={this.toggleModal.bind(this)}
            addFromCreate={(created) => this.props.addToBuilder(created)}/>
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