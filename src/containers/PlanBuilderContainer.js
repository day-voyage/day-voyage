import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder,
        deleteFromBuilder,
        reorderUp,
        reorderDown,
        changingRoutes,
        goToConfirm,
        saveActivityToDb } from '../actions';
import PlanBuilderItem from '../components/PlanBuilderItem';
import CreateActivity from '../components/CreateActivity';
import Maps from '../components/Maps';
import FlatButton from 'material-ui/FlatButton';
import { Card } from 'material-ui/Card';

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

  checkIfLoggedIn() {
    var token = localStorage.getItem('token');
    if (token) {
      this.props.goToConfirm();
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
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
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
        <Card>
          <h3 style={{marginLeft: 15}}>Itinerary</h3>
          <CreateActivity
            modal={this.state.modalOpen}
            toggleModal={this.toggleModal.bind(this)}
            openSnackbar={this.props.openSnackbar}
            addFromCreate={(activity) => this.props.addToBuilder(activity)}
            saveToDb={(activity) => this.props.saveActivityToDb(activity, auth.token.access_token)}/>
          <FlatButton
            label="Create Own Activity"
            onClick={this.toggleModal.bind(this)} /><br />
          {nodes}
          <div style={{marginBottom: 10}}>
            <FlatButton
              label="Confirm"
              onClick={this.checkIfLoggedIn.bind(this)}
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
    saveActivityToDb }
)(PlanBuilderContainer)

