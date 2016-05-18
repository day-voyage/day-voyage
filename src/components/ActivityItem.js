import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog'; //TODO: Dialog is not being used here, so take it out
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { isLoggedIn } from '../utils';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';

/**
* template for individual activity items, 'dumb' child component of Activity
*/
export default class ActivityItem extends Component {
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
    let loggedIn = isLoggedIn();
    if (loggedIn) {
      this.props.onAddToBuilderClicked();
      this.props.openSnackbar("Event has been added to your itinerary");
    } else {
      this.props.openSnackbar('Please login to add activity to your itinerary');
    }
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
      <Card className="item-card" style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <div className="card-content">

          <CardHeader
            title={title}
            subtitle={activity.neighborhood ? activity.neighborhood.join(', ') : ''}
            onClick={this.toggleDesc.bind(this)}
            actAsExpander={true}
          />
          {this.state.descOpen ? 
            <CardText>
              <strong>Estimated cost: </strong> 
                ${activity.price?activity.price:'0'}. (add activity to modify)<br />
              <strong>Address:</strong>
              <br />{activity.address}<br />
              {activity.city}, {activity.state}<br /><br />
              {activity.desc}
            </CardText> : null}
        </div>
        <div className="add-btn">
          <IconButton 
            tooltip="Add to itinerary"
            onClick={this.clickAddButton.bind(this)}
            disabled={activity.added ? true : false}
            label={activity.added ? 'Added' : ''}>
            <ContentAdd />
          </IconButton>
        </div>
      </Card>
    )
  }
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}

const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
};
