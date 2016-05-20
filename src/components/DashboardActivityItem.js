import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';


/**
* template for individual activity items, 'dumb' child component of Activity
*/
export default class DashboardActivityItem extends Component {
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
    this.props.openSnackbar("Event has been added to your plan");
  }

  toggleDesc() {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  render() {
    const { activity } = this.props;
    var title = activity.distance ? activity.title + ' - ' + activity.distance + " away" : activity.title;
    return (
      <Card style={{padding: 15}}>
        <CardHeader
          titleStyle={{fontSize: 18}}
          title={title}
          subtitle={activity.neighborhood ? activity.neighborhood.join(', ') : ''}
          onClick={this.toggleDesc.bind(this)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <FlatButton
          onClick={this.clickAddButton.bind(this)}
          disabled={activity.added ? true : false}
          label={activity.added ? 'Added' : 'Add to plan'} />
        {this.state.descOpen ? <CardText><strong>Address:</strong><br />{activity.address}<br />{activity.city}, {activity.state}<br /><br />{activity.desc}</CardText> : null}
      </Card>
    )
  }
}


const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
};
