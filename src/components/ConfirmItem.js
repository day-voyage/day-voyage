import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class ConfirmItem extends Component {

  removeItem() {
    this.props.openSnackbar("Event has been removed from your itinerary");
    this.props.onDeleteFromBuilderClicked();
    console.log('delete from confirm clicked');
  }

  render() {
    const { activity, order } = this.props

    return (
      <Card className="confirm-item-card">
      <div className="row">
        <CardHeader 
          title={order + '   ' + activity.title}
          subtitle={activity.neighborhood ? activity.neighborhood.join(', ') : ''}
          key={activity.i}
        />
        <CardText>
          <strong>Address:</strong><br />
          {activity.address}<br />
          {activity.city}, {activity.state}<br /><br />
        </CardText>
      </div>
      <div className="row">
        <FlatButton
          label="Up"
          onClick={this.props.onMoveUpClicked} />
        <FlatButton
          label="Down"
          onClick={this.props.onMoveDownClicked} />
        <ContentRemoveCircle onClick={this.removeItem.bind(this)}/>
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