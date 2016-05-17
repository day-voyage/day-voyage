import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default class DBPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descOpen: false
    };
  }

  openLink() {
    const { plan } = this.props;
    window.open(`http://localhost:3000/?plan=${plan.id}`, 'blank');
  }

  addPlan() {
    console.log('add to plan here');
  }

  render() {
    const { plan } = this.props;
    var title = plan.title;
    return (
      <Card style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <CardHeader
          title={plan.title}
          subtitle={plan.desc}
          actAsExpander={true}
          showExpandableButton={true} />
        <FlatButton
          onClick={this.openLink.bind(this)}
          label="Show More Details" />
        <FlatButton
          onClick={this.addPlan.bind(this)}
          label="Add" />
      </Card>
    )
  }
}