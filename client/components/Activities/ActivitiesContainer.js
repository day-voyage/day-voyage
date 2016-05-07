import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToBuilder } from '../../redux/actions'
import { getVisibleActivities } from '../../redux/reducers/activities.js'
import CreateActivity from './CreateActivity'
import ActivityItem from './ActivityItem'
import ActivitiesList from './ActivitiesList'

class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  openModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    const { activities } = this.props;

    return (
      <div className="col-md-4">
        <button onClick={this.openModal.bind(this)} >Create An Activity</button>
        <CreateActivity modal={this.state.modalOpen} toggleModal={this.openModal.bind(this)}/>
        <ActivitiesList title="Activities">
          {activities.map(activity =>
            <ActivityItem
              key={activity.title}
              activity={activity}
              onAddToBuilderClicked={() => this.props.addToBuilder(activity.title)} />
          )}
        </ActivitiesList>
      </div> 
    )
  }
}

ActivitiesContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    // categories: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    added: PropTypes.bool.isRequired
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: getVisibleActivities(state.activities)
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(ActivitiesContainer)