import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes,
        editDescription,
        createPlan,
        deleteActivityFromDb } from '../actions';
import { bindActionCreators } from 'redux';
import ConfirmItem from '../components/ConfirmItem'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';

var shortid = require('shortid');

export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planTitle: '',
      modalOpen: false,
      email: null,
      emails: []
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  saveItinerary() {
    this.toggleModal();
    this.props.createPlan(Object.assign({}, {
      user_id: auth.token.user_id,
      clientside_id: shortid.generate(),
      title: this.state.planTitle,
      desc: '',
      likes: 0
    }), activityIds, (response) => console.log('saved to db, response: ', response));
  }

  handleTitle(event) {
    this.setState({planTitle: event.target.value});
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  selectConfirmTab() {
    this.setState({
      value: 'confirm'
    });
  }

  selectShareTab() {
    this.setState({
      value: 'share'
    });
  }

  addEmail() {
    var emailsArr = this.state.emails.slice();
    emailsArr.push(this.state.email.trim());
    this.setState({
      emails: emailsArr
    });
  }

  removeEmail(email){
    console.log(email);
  }

  emailPlan() {
    window.open(`mailto:${this.state.emails.join(',')}?Subject=${this.state.planTitle}`);
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

    const actions = [
          <FlatButton
            label="Thanks"
            primary={true}
            onClick={this.toggleModal.bind(this)}
          />
        ];
    
    return (
      <Card>
      <TextField
        hintText="Name Your Itinerary"
        onChange={this.handleTitle.bind(this)}
      /><br />
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
          onClick={this.saveItinerary.bind(this)}>
          Save Itinerary
        </FlatButton>
        <Dialog
          title="You have saved your itinerary!"
          actions={actions}
          modal={true}
          open={this.state.modalOpen}>
          <Tabs
            value={this.state.value}>
            <Tab
              value="confirm"
              label="CONFIRM"
              onClick={this.selectConfirmTab.bind(this)}>
                Tab One
            </Tab>
            <Tab
              value="share"
              label="SHARE"
              onClick={this.selectShareTab.bind(this)}>
              <div className="container">
              <div className="row">
                <h3>Share with your Facebook friends</h3>
                <p>add link here</p>
              </div>
                <div className="row">
                  <h3>Email your itinerary to your friends!</h3>
                  <div className="col-sm-4">
                    <TextField
                      className="text-field"
                      id="send-field"
                      type="send"
                      onChange={this.handleEmail.bind(this)}
                      placeholder="Email"
                      style={{marginBottom: 15}} /><br />
                    <br />
                    <FlatButton
                      label="Add"
                      primary={true}
                      onClick={this.addEmail.bind(this)}
                    />
                    <FlatButton
                      label="Email Itinerary"
                      primary={true}
                      onClick={this.emailPlan.bind(this)}
                    />
                  </div>
                  <div className="col-sm-4" style={{marginTop: 15}}>
                    {this.state.emails.length > 0 ? <b>Emails Added<br /></b> : null}
                    {this.state.emails.length > 0 ? this.state.emails.map((email) => {
                      return <em onClick={this.removeEmail.bind(this, email)}>{email}<br/></em>
                    }) : null}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Dialog>
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