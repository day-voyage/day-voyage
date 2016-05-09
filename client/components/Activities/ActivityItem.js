import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import Maps from '../Helpers/Maps';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      buttonClicked: false
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  clickAddButton() {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    });
    this.props.onAddToBuilderClicked();
    this.props.openSnackbar("Event has been added to your itinerary");
  }

  render() {
    const { activity } = this.props;
    return (
      <Card style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <CardHeader
          title={activity.title}
          subtitle={activity.neighborhood.join(', ')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <FlatButton
          onClick={this.clickAddButton.bind(this)}
          disabled={activity.added ? true : false}
          label={activity.added ? 'Added' : 'Add to itinerary'} />
        <img src='../../assets/open.png' onClick={this.toggleModal.bind(this)} />
        <CardText expandable={true}>
          {activity.desc}
        </CardText>
        <Dialog
          open={this.state.modalOpen}
          modal={true}
          style={customContentStyle} >
          <div className="container">
            <div className="row">
              <div>
                <FlatButton
                  onClick={this.toggleModal.bind(this)}
                  label="Close Map" />
              </div>
              <Maps size="small" lat={activity.lat} long={activity.long} title={activity.title} />
            </div>
          </div>
        </Dialog>
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