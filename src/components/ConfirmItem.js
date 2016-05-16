import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

/**
* template for individual confirm items, 'dumb' child component of ConfirmContainer
*/
export default class ConfirmItem extends Component {
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {boolean} descOpen toggles card expansion
     * @property {string} description of itinerary that user inputs
     * @property {boolean} edited toggles
     */
    this.state = {
      descOpen: false,
      description: '',
      edited: false
    };
  }

  toggleDesc(evt) {
    this.setState({
      descOpen: !this.state.descOpen
    });
  }

  removeItem() {
    this.props.openSnackbar("Event has been removed from your itinerary");
    this.props.onDeleteFromBuilderClicked();
  }

  handleDesc(event){
    this.setState({
      description: event.target.value,
      edited: true
    })
  }

  handleSave(){
    this.props.editDescChange(this.state.description);
    this.setState({edited: false});
  }

  render() {
    const { activity, order } = this.props
    const address = activity.address ?
                      activity.address + '  ' + String.fromCharCode(183) + '  ':''

    if (this.state.descOpen) {
      var cardDesc = <div>
          <strong>Description:</strong><br />
          <TextField
            id="text-field-default"
            defaultValue={activity.desc}
            onChange={this.handleDesc.bind(this)}
            multiLine={true}
            rows={4} />
           <FlatButton
            label="Save"
            className="save-info-btn"
            disabled={!this.state.edited}
            onClick={this.handleSave.bind(this)} /> <br />
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
            title={order + '   ' + activity.title}
            subtitle={address + activity.neighborhood}
            key={activity.i}
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

// ConfirmItem.propTypes = {
//   activity: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     // categories: PropTypes.array.isRequired,
//     city: PropTypes.string.isRequired,
//     added: PropTypes.bool.isRequired
//   }).isRequired
// }
