import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes,
        editDescription,
        createPlan,
        deleteActivityFromDb,
        saveActivityToDb,
        updateActivity } from '../actions';
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
      plan_id: null
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
        user_id: this.props.auth.user_id,
        clientside_id: shortid.generate(),
        title: this.state.planTitle,
        desc: '',
        likes: 0
      }), [], (response) => {
        console.log('save itin response: ', response);
        this.setState({
          plan_id: response.data[0].id
        });
        var activities = [];
        this.props.planBuilder.forEach((activity, index) => {
          this.props.saveActivityToDb(Object.assign(activity, {
            isYelp: true,
            user_gen: false,
            clientside_id: shortid.generate(),
            plan_id: response.data[0].id,
            index: index
          }), this.props.auth.token.access_token);
        });

      });
    }
  }

  handleTitle(event) {
    this.setState({planTitle: event.target.value});
  }

  render() {
    const { planBuilder, auth } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(planBuilder.indexOf(activity));
              
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));
              }}/>
        )}
        </div>
        <FlatButton
          onClick={() => this.saveItinerary()}>
          Save Itinerary
        </FlatButton>
        <SavePlan
          toggleModal={this.toggleModal.bind(this)}
          toggleSnackbar={this.toggleSnackbar.bind(this)}
          planTitle={this.state.planTitle}
          plan_id={this.state.plan_id}
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
    deleteActivityFromDb,
    saveActivityToDb,
    updateActivity }
)(ConfirmContainer)