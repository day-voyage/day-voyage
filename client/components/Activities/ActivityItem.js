import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Maps from '../Helpers/Maps';

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
      <div
        style={{ marginBottom: 20,
                borderStyle: "solid",
                borderWidth: "2px" }}>
        <div> {activity.title} - {activity.desc} {activity.neighborhood } <img src='../../assets/open.png' onClick={this.toggleModal.bind(this)} /></div>
        <Modal
          isOpen={this.state.modalOpen}
          style={customStyles} >
          <div className="container">
            <div className="row">
              <img src='../../assets/close.png' onClick={this.toggleModal.bind(this)} />
              <div> {activity.title} - {activity.neighborhood }</div>
              <Maps size="small" lat={activity.lat} long={activity.long} title={activity.title} />
            </div>
          </div>
        </Modal>
        <button
          onClick={this.clickAddButton.bind(this)}
          disabled={activity.added ? 'disabled' : ''}>
          {activity.added ? 'Added' : 'Add to itinerary'}
        </button>
      </div>
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