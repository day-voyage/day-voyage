import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'


export default class ConfirmItem extends Component {

  removeItem() {
    this.props.openSnackbar("Event has been removed from your itinerary");
    this.props.onDeleteFromBuilderClicked();
    console.log('delete from confirm clicked');
  }

  render() {
    const { activity, order } = this.props
    const address = activity.address ? 
                      activity.address + '  ' + String.fromCharCode(183) + '  ':
                      ''

    return (
      <Card className="item-card">
        <div className="card-content">
          <CardHeader 
            title={order + '   ' + activity.title}
            subtitle={address + activity.neighborhood}
            key={activity.i}
          />
          <CardActions>
            <FlatButton 
              label="Remove"
              style={{color: '#F44336'}}
              onClick={this.removeItem.bind(this)} />
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