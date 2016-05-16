import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder,
        deleteFromBuilder,
        reorderUp,
        reorderDown,
        changingRoutes,
        goToConfirm,
        saveActivityToDb,
        deleteActivityFromDb } from '../actions';
import PlanBuilderItem from '../components/PlanBuilderItem';
import CreateActivity from '../components/CreateActivity';
import Maps from '../components/Maps';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';
import { isLoggedIn } from '../utils';

class PlanBuilderContainer extends Component {
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
    if (!!isLoggedIn()) {
      this.props.goToConfirm();
    } else {
      this.props.openSnackbar("Please sign in or create a profile to continue");
    }
  }

  deleteActivity(activity) {
    this.props.deleteFromBuilder(activity);

    if (!activity.plan_id){
      this.props.deleteActivityFromDb(activity.id, response => console.log('activity deleted from db, response: ', response));
    }
  }

  openCreate() {
    if (!!isLoggedIn()) {
      this.toggleModal();
    } else {
      this.props.openSnackbar("Please sign in or create a profile to continue");
    }
  }

  render() {
    const { planBuilder, activities, auth } = this.props;
    const hasActivities = planBuilder.length > 0;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {planBuilder.map((activity, index) =>
          <PlanBuilderItem
            key={index}
            activity={activity}
            order={alphabetOrder[index] + '.'}
            openSnackbar={this.props.openSnackbar}
            onDeleteFromBuilderClicked={() => this.deleteActivity(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(planBuilder.indexOf(activity));

            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));

            }}/>
        )}
        </div>
      </div>
    return (
      <div>
        <div className="row" style={{marginBottom: 10}}>
          <Maps size="small" />
        </div>
        <h3 style={{marginLeft: 15}}>Itinerary</h3>
        <Card>
          <CreateActivity
            modal={this.state.modalOpen}
            toggleModal={this.toggleModal.bind(this)}
            openSnackbar={this.props.openSnackbar}
            addFromCreate={(activity) => this.props.addToBuilder(activity)}
            saveToDb={(activity) => this.props.saveActivityToDb(activity, auth.token.access_token)}
            user_id={auth.user_id}/>
          <FlatButton
            label="Create Own Activity"
            onClick={this.openCreate.bind(this)} />
          <FlatButton
            label="Clear All"
            onClick={() => planBuilder.forEach(element => this.deleteActivity(element))} /><br />
          {nodes}
          <div style={{marginBottom: 10}}>
            <FlatButton
              label="Confirm"
              onClick={this.goToConfirm.bind(this)}
              style={{position: "relative", float: "right"}}
              disabled={hasActivities ? false : true} />
          </div>
        </Card>
      </div>
    )
  }
}

PlanBuilderContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  })).isRequired
}

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
    activities: state.activities,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder,
    deleteFromBuilder,
    reorderUp,
    reorderDown,
    changingRoutes,
    goToConfirm,
    saveActivityToDb,
    deleteActivityFromDb }
)(PlanBuilderContainer)

