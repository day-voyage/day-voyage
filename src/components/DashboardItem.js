import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog'; //TODO: Dialog is not being used here, so take it out
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { addToBuilder, 
        changingRoutes,
        saveActivityToDb } from '../actions';
import ActivityItem from '../components/ActivityItem';

var shortid = require('shortid');


/**
* template for individual dashboard items, 
*/
export default class DashboardItem extends Component {
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {boolean} buttonClicked triggers addToBuilder and openSnackbar
     * in ActivityContainer
     * @property {boolean} descOpen toggles card expansion
     */
    this.state = {
      buttonClicked: false,
      descOpen: false
    };
  }

  clickAddButton() {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    });
    this.props.onAddToBuilderClicked();
    this.props.openSnackbar("Event has been added to your itinerary");
  }

  toggleDesc() {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  render() {
    const { plan, activities } = this.props;

    return (
      <Card style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <CardHeader
          title={plan.title}
          subtitle={plan.desc}
          onClick={this.toggleDesc.bind(this)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        {activities.map((activity, index) => {
            return <ActivityItem
              key={index}
              activity={activity}
              openSnackbar={this.props.openSnackbar}
              onAddToBuilderClicked={() => {
                this.props.addToBuilder(activity);
                this.props.saveActivityToDb(Object.assign(activity, {
                  isYelp: true,
                  user_gen: false,
                  clientside_id: shortid.generate()
                }), auth.token.access_token);
              }}/>
            }
          )}
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
    activities: state.activities,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder,
    saveActivityToDb }
)(DashboardItem)
