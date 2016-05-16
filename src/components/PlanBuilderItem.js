import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

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

  toggleDesc(evt) {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  render() {
    const { activity, order } = this.props;

    var title = activity.distance ? order + '   ' + activity.title + ' - ' + activity.distance + " away" : order + '   ' + activity.title;

    if (this.state.descOpen) {
      var cardDesc = <div>
          <strong>Address:</strong><br />
          {activity.address}<br />
          {activity.city}, {activity.state}<br /><br />
          {activity.desc}
          <FlatButton 
              label="Remove"
              style={{color: '#F44336'}}
              onClick={this.removeItem.bind(this)} />
        </div>
    } else {
      var cardDesc = 
      <div>
        <FlatButton 
              label="Remove"
              style={{color: '#F44336'}}
              onClick={this.removeItem.bind(this)} />
      </div>
    }
    return (
      <Card 
        className="item-card"
        style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <div className="card-content">
          <CardHeader
            title={title}
            subtitle={activity.neighborhood ? activity.neighborhood.join(', ') : ''}
            onClick={this.toggleDesc.bind(this)}
            key={activity.i}
            actAsExpander={true}
            showExpandableButton={true}
            onClick={this.toggleDesc.bind(this)} />
          <CardText>
            {cardDesc}
          </CardText>
        </div>
        <div className="reorder-btns">
          <IconButton 
            tooltip="Move Up"
            onClick={this.props.onMoveUpClicked}>
            <HardwareKeyboardArrowUp />
          </IconButton>
          <IconButton 
            tooltip="Move Down"
            onClick={this.props.onMoveDownClicked}>
            <HardwareKeyboardArrowDown />
          </IconButton>
        </div>
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
