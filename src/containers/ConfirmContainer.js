import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes,
        editDescription,
        createPlan,
        deleteActivityFromDb } from '../actions';
import { bindActionCreators } from 'redux';
import ConfirmItem from '../components/ConfirmItem';
import SavePlan from '../components/SavePlan';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';

var shortid = require('shortid');

export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planTitle: '',
      modalOpen: false,
      snackbar: false,
      message: '',
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  toggleSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(() => this.setState({snackbar: false}), 2000);
  }

  saveItinerary() {
    if (this.state.planTitle.length === 0) {
      this.toggleSnackbar("Please name your itinerary");
    } else {
      this.toggleModal();
      this.props.createPlan(Object.assign({}, {
        user_id: auth.token.user_id,
        clientside_id: shortid.generate(),
        title: this.state.planTitle,
        desc: '',
        likes: 0
      }), activityIds, (response) => console.log('saved to db, response: ', response));
    }
  }

  handleTitle(event) {
    this.setState({planTitle: event.target.value});
  }

  deleteActivity(activity) {
    this.props.deleteFromBuilder(activity);

    this.props.deleteActivityFromDb(activity.id, response => console.log('activity deleted from db, response: ', response));
  }

  render() {
    const { planBuilder, auth } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var activityIds = [];
    for (var i = 0; i < planBuilder.length; i++) {
      activityIds.push({id: planBuilder[i].id});
    }

    return (
      <Card>
        <TextField
          hintText="Name Your Itinerary"
          onChange={this.handleTitle.bind(this)}/><br />
        <div>
        {planBuilder.map((activity, index) => 
          <ConfirmItem
            key={index}
            activity={activity}
            order={alphabetOrder[index] + '.'}
            openSnackbar={this.props.openSnackbar}
            editDescChange={(text) => this.props.editDescription(index, text)}
            onDeleteFromBuilderClicked={() => this.deleteActivity(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(planBuilder.indexOf(activity));
              
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));
              }}/>
        )}
        </div>
        <FlatButton
          onClick={() => this.saveItinerary(auth.token.user_id, activityIds)}>
          Save Itinerary
        </FlatButton>
        <SavePlan
          toggleModal={this.toggleModal.bind(this)}
          toggleSnackbar={this.toggleSnackbar.bind(this)}
          planTitle={this.state.planTitle}
          modalOpen={this.state.modalOpen}/>
        <Snackbar
          open={this.state.snackbar}
          message={this.state.message}
          autoHideDuration={2000} />
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
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
    editDescription,
    createPlan,
    editDescription,
    deleteActivityFromDb }
)(ConfirmContainer)