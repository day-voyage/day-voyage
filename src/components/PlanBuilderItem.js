import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class PlanBuilderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descOpen: false
    };
  }

  removeItem() {
    this.props.openSnackbar("Event has been removed from your itinerary");
    this.props.onDeleteFromBuilderClicked();
  }

  toggleDesc() {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  render() {
    const { activity } = this.props;

    return (
      <Card>
        <CardHeader
          title={activity.title}
          subtitle={activity.neighborhood}
          onClick={this.toggleDesc.bind(this)}
          key={activity.i}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <ContentRemoveCircle onClick={this.removeItem.bind(this)}/>
        <FlatButton
          label="Up"
          onClick={this.props.onMoveUpClicked} />
        <FlatButton
          label="Down"
          onClick={this.props.onMoveDownClicked} />
        {this.state.descOpen ? <CardText>{activity.desc}</CardText> : null}
      </Card>
    )
  }
}

PlanBuilderItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  }).isRequired,
  onDeleteFromBuilderClicked: PropTypes.func.isRequired
}
