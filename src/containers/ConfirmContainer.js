import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        editDescription,
        editPrice,
        createPlan,
        saveActivityToDb,
        receiveBudget } from '../actions';
import ConfirmItem from '../components/ConfirmItem';
import SavePlan from '../components/SavePlan';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';

var shortid = require('shortid');

export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planTitle: '',
      modalOpen: false,
      snackbar: false,
      message: '',
      plan_id: null,
      budgeting: this.props.data.budget > 0 ? true : false,
      budgetingButtonColor: this.props.data.budget? "#00cc00":"#000000"
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

  saveplan() {

    if (this.state.planTitle.length === 0) {
      this.toggleSnackbar("Please name your plan");
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

  getTotalPrice() {
    var total = 0;
    this.props.planBuilder.forEach(activity => {
      if (activity.price) { 
        total += parseInt(activity.price) ;
      }});
    return total;
  }

  handleBudget(event){
    this.props.receiveBudget(event.target.value)
  }

  checkBudgeting() {
    this.setState({
      budgeting: !this.state.budgeting,
    })

    if (!this.state.budgeting) {
      this.setState({
        budgetingButtonColor: "#00cc00"
      })
    } else {
      this.setState({
        budgetingButtonColor: "#000000"
      })
    }
  }
  
  render() {
    const { planBuilder, auth, data } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const budgetField = this.state.budgeting ?
      <div>
        <CardText>
          Budget: $<TextField
           type="number"
           defaultValue={this.props.data.budget}
           onChange={this.handleBudget.bind(this)}/><br />
        Current cost so far: 
        <span style={
          this.getTotalPrice() <= data.budget ?
          {color: '#009900'}:
          {color: '#F44336'}}> ${this.getTotalPrice()}</span>
        </CardText>
      </div> : ''


    return (
      <Card>
        <TextField
          hintText="Name Your plan"
          onChange={this.handleTitle.bind(this)}/><br />
        <div>
       <FlatButton
            label="Budgeting"
            labelPosition="after"
            primary={true}
            onClick={this.checkBudgeting.bind(this)}
            icon={<EditorAttachMoney />}
            style={{color: this.state.budgetingButtonColor}}
          />
        {budgetField}
        {planBuilder.map((activity, index) => 
          <ConfirmItem
            key={index}
            activity={activity}
            order={alphabetOrder[index] + '.'}
            openSnackbar={this.props.openSnackbar}
            editPriceChange={price => this.props.editPrice(index, price)}
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
          onClick={() => this.saveplan()}>
          Save plan
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
    auth: state.auth,
    data: state.data
  }
}

export default connect(
  mapStateToProps,
  { deleteFromBuilder,
    reorderUp,
    reorderDown,
    editDescription,
    createPlan,
    editPrice,
    saveActivityToDb,
    receiveBudget }
)(ConfirmContainer)