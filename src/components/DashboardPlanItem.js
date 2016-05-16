import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'; //TODO: Dialog is not being used here, so take it out
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { addToBuilder, 
        changingRoutes,
        saveActivityToDb } from '../actions';
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

  goToPlanPage() {
    
  }

  render() {
    const { auth, activities } = this.props;

    var mappedActivities = activities.map((activity, index) => {
              return <DashboardActivityItem
                key={index}
                activity={activity}
                openSnackbar={this.props.openSnackbar}
                onAddToBuilderClicked={() => {
                  this.props.addToBuilder(activity);
                  this.props.saveActivityToDb(Object.assign(activity, {
                    plan_id: null,
                    clientside_id: shortid.generate()
                  }), auth.token.access_token);
                }}/>
              }
            )

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
        <FlatButton
          onClick={() => }
          label={'View map'} />
          <FlatButton
            onClick={() => {
              activities.forEach(activity => {
                this.props.addToBuilder(activity);
                this.props.saveActivityToDb(Object.assign(activity, {
                  plan_id: null,
                  clientside_id: shortid.generate()
                }), auth.token.access_token);
              })
            }}
            label={'Copy this plan'} />
            {this.state.descOpen? mappedActivities : null}
          
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
    saveActivityToDb }
)(DashboardPlanItem)
