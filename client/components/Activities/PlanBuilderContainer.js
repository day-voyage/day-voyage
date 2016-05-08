import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmPlan, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes } from '../../redux/actions';
import { buildPlanner } from '../../redux/reducers';
import PlanBuilderItem from './PlanBuilderItem';
import Maps from '../Helpers/Maps';
import FlatButton from 'material-ui/FlatButton';


class PlanBuilderContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  goToConfirm() {
    this.context.router.push('/confirmation');
  }

  render() {
    const { activities } = this.props

    const hasActivities = activities.length > 0
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {activities.map(activity => 
          <PlanBuilderItem
            // key={activity.lat}
            activity={activity}
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(activities.indexOf(activity));
              changingRoutes(activities);
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(activities.indexOf(activity));
              changingRoutes(activities);
            }}/>
        )}
        </div>
      </div>
    return (
      <div className="col-md-6">
        <h3>Itinerary</h3>
        <div className="row">
          <Maps size="small" />
        </div>
        {nodes}
        <FlatButton
          label="Confirm"
          onClick={() => this.goToConfirm()}
          disabled={hasActivities ? '':'disabled'} />
      </div>
    )
  }
} 

PlanBuilderContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  })).isRequired,
  confirmPlan: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    activities: state.planBuilder,
  }
}

export default connect(
  mapStateToProps,
  { confirmPlan, deleteFromBuilder, reorderUp, reorderDown, changingRoutes }
)(PlanBuilderContainer)
