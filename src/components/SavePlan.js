import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default class SavePlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emails: []
    };
  }

  openModal() {
    this.props.toggleModal();
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  selectShareTab() {
    this.setState({
      value: 'share'
    });
  }
  
  selectConfirmTab() {
    this.setState({
      value: 'confirm'
    });
  }

  addEmail() {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (this.state.email === '' || !re.test(this.state.email)) {
      this.props.toggleSnackbar("Please enter a valid email");
    } else {
      var emailsArr = this.state.emails.slice();
      emailsArr.push(this.state.email.trim());
      this.setState({
        emails: emailsArr
      });
    }
  }

  removeEmail(email){
    var emailsArr = this.state.emails.slice();
    var index = this.state.emails.indexOf(email);
    emailsArr.splice(index);
    this.setState({
      emails: emailsArr
    });
  }

  emailPlan() {
    const { planBuilder } = this.props;

    var bodyText = planBuilder.map((item) => [item.title, item.address, item.city + ", " + item.state].join('%0D%0A') + '%0D%0A').join('%0D%0A');
    window.open(`mailto:${this.state.emails.join(',')}?subject=${this.props.planTitle}&body=${bodyText}`);
  }

  render() {
    const actions = [
        <FlatButton
          label="Thanks"
          primary={true}
          onClick={this.openModal.bind(this)}/>
      ];
    return (
      <Dialog
        title="You have saved your itinerary!"
        modal={true}
        actions={actions}
        open={this.props.modalOpen}>
        <Tabs
          value={this.state.value}>
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
                    disabled={this.state.emails.length < 1}
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
          <Tab
            value="confirm"
            label="CONFIRM"
            onClick={this.selectConfirmTab.bind(this)}>
              Tab One
          </Tab>
        </Tabs>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
  }
}

export default connect(
  mapStateToProps
)(SavePlan)