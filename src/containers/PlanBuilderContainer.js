import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmPlan,
        addToBuilder,
        deleteFromBuilder,
        reorderUp,
        reorderDown,
        changingRoutes } from '../actions';
import { buildPlanner } from '../reducers';
import PlanBuilderItem from '../components/PlanBuilderItem';
import CreateActivity from '../components/CreateActivity';
import Maps from '../components/Maps';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions';
import push from 'redux-router';


class PlanBuilderContainer extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // }

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

  goToConfirm() {
    dispatch(push('/confirmation'));
  }

  render() {
    const { planBuilder, activities } = this.props;
    console.log(`props in planbuilder: planBuilder:`, planBuilder);
    console.log(`activities:`, activities);
    console.log('actions:', this.props.actions);
    console.log('state', this.state);
    const hasActivities = Array.from(planBuilder.activities).length > 0;
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {planBuilder.activities.map(activity =>
          <PlanBuilderItem
            // key={activity.lat}
            activity={activity}
            openSnackbar={this.props.openSnackbar}
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              var indexOfActivity = planBuilder.indexOf(activity);
              console.log(indexOfActivity);
              this.props.reorderUp(indexOfActivity);
              changingRoutes(planBuilder);
            }}
            onMoveDownClicked={() => {
              var indexOfActivity = planBuilder.indexOf(activity);
              this.props.reorderDown(indexOfActivity);
              changingRoutes(planBuilder.activities);
            }}/>
        )}
        </div>
      </div>
    return (
      <div className="col-md-6">
        <div className="row" style={{marginBottom: 10}}>>
          <Maps size="small" />
        </div>
        <Card>
          <h3 style={{marginLeft: 15}}>Itinerary</h3>
          <CreateActivity
            modal={this.state.modalOpen}
            toggleModal={this.toggleModal.bind(this)}
            openSnackbar={this.props.openSnackbar}
            addFromCreate={(created) => this.props.actions.addToBuilder(created)}/>
          <FlatButton
            label="Create Own Activity"
            onClick={this.toggleModal.bind(this)} /><br />
          {nodes}
          <div style={{marginBottom: 10}}>
            <FlatButton
              label="Confirm"
              onClick={() => this.goToConfirm()}
              style={{position: "relative", float: "right"}}
              disabled={hasActivities ? false : true} />
          </div>
        </Card>
      </div>
    )
  }
}

// PlanBuilderContainer.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     city: PropTypes.string
//   })).isRequired,
//   confirmPlan: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
    activities: state.activities
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actionCreators, dispatch)
// });


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(PlanBuilderContainer);
