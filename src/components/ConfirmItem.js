import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'


export default class ConfirmItem extends Component {
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

  render() {
    const { activity, order } = this.props
    const address = activity.address ? 
                      activity.address + '  ' + String.fromCharCode(183) + '  ':''

    if (this.state.descOpen) {
      var cardDesc = <div>
          <strong>Address:</strong><br />
          {activity.address}<br />
          {activity.city}, {activity.state}<br /><br />
          {activity.desc}
          <FlatButton 
            label="Hide"
            className="hide-info-btn"
            onClick={this.toggleDesc.bind(this)} />
          <FlatButton 
              label="Remove"
              style={{color: '#F44336'}}
              onClick={this.removeItem.bind(this)} />
        </div>
    } else {
      var cardDesc = 
      <div>
        <FlatButton 
          label="Show more"
          className="more-info-btn"
          onClick={this.toggleDesc.bind(this)} />
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
            title={order + '   ' + activity.title}
            subtitle={address + activity.neighborhood}
            key={activity.i}
          />
          <CardActions>
            <IconButton
              tooltip="Remove"
              onClick={this.removeItem.bind(this)}>
              <ContentRemoveCircleOutline />
            </IconButton>
          </CardActions>
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

// ConfirmItem.propTypes = {
//   activity: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     // categories: PropTypes.array.isRequired,
//     city: PropTypes.string.isRequired,
//     added: PropTypes.bool.isRequired
//   }).isRequired
// }