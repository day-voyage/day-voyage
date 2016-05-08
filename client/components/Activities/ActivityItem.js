import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
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
  }

  render() {
    const { activity } = this.props;

    return (
      <Card>
        <CardHeader
          title={activity.title}
          subtitle={activity.neighborhood}
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
        <Modal
          isOpen={this.state.modalOpen}
          style={customStyles} >
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
        </Modal>
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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};