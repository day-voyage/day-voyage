import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog'; //TODO: Dialog is not being used here, so take it out
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { addToBuilder, 
        changingRoutes,
        deleteActivityFromDb } from '../actions';
import { deletePlan } from '../utils';
import DashboardActivityItem from '../components/DashboardActivityItem';

var shortid = require('shortid');


/**
* template for individual dashboard items, 
*/
export default class DashboardPlanItem extends Component {
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {boolean} buttonClicked triggers addToBuilder and openSnackbar
     * in ActivityContainer
     * @property {boolean} descOpen toggles card expansion
     */
    this.state = {
      copied: false,
      descOpen: false
    };
  }

  toggleDesc() {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  toggleCopy() {
    this.setState({
      copied: true
    })
    console.log(this.state.copied);
  }

  render() {
    const { auth, activities } = this.props;

    if (activities) {
      var mappedActivities = activities.map((activity, index) => {
          return <DashboardActivityItem
            key={index}
            activity={activity}
            openSnackbar={this.props.openSnackbar}
            onAddToBuilderClicked={() => {
              this.props.addToBuilder(activity);
            }}/>
          }
        )
    }

    return (
      <Card style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.desc}
          onClick={this.toggleDesc.bind(this)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <div>
        <a href={`http://localhost:3000/?plan=${this.props.plan_id}`}>
          <FlatButton label={'View map'} />
        </a>
          <FlatButton
            onClick={() => {
              activities.forEach(activity => {
                this.props.addToBuilder(activity);
              })
            }}
            label={'Copy this plan'} />
          <FlatButton
            onClick={() => {
              activities.forEach(activity => {
                this.props.deleteActivityFromDb(activity.id, response => console.log('activity deleted'));
              });
              deletePlan(this.props.plan_id, response => console.log('plan deleted'));
            }}
            label={'Delete'} />
            {this.state.descOpen ? mappedActivities : null}
          </div>
      </Card>
    )
  }
}


const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder,
    deleteActivityFromDb }
)(DashboardPlanItem)
