import React, { Component } from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Geosuggest from 'react-geosuggest/module/Geosuggest';

export default class CreateActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: '',
      address: '',
      city: '',
      stateZip: '',
      lat: '',
      long: '',
    };
  }

  componentDidMount() {
    if (this.props.open) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.props.toggleModal();
  }

  addEvent(event) {
    event.preventDefault();
    console.log("add event!");
    this.props.toggleModal();
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleAddress(event) {
    this.setState({address: event.target.value});
  }

  handleCity(event) {
    this.setState({city: event.target.value});
  }

  handleState(event) {
    this.setState({state: event.target.value});
  }

  onSuggestSelect(place) {
    var address = place.label.split(', ');

    var name = address[0];
    var streetAddress = address[1];
    var city = address[2];
    var stateZip = address[3];
    var lat = place.location.lat;
    var long = place.location.lng;

    if (address.length >= 4) {
      this.setState({
        name: name,
        address: streetAddress,
        city: city,
        stateZip: stateZip,
        lat: lat,
        long: long
      })
    }
    
  }

  render() {

    return (
      <Modal
        isOpen={this.props.modal}
        style={customStyles} >
        <div className="container">
          <div className="row">
            <img src='../../assets/close.png' onClick={this.toggleModal.bind(this)} />
            <h2>Create your own activity</h2>

            <Geosuggest
              className="geosuggest"
              placeholder="Start typing!"
              initialValue="San Francisco"
              onSuggestSelect={this.onSuggestSelect.bind(this)}
              location={new google.maps.LatLng(53.558572, 9.9278215)}
              radius="20" />

            <form style={{textAlign: "left", marginTop: 10}} className="commentForm" onSubmit={this.addEvent.bind(this)}>
              Name: <br />
              <TextField
                id="name-field"
                type="text"
                value={this.state.name}
                style={{marginBottom: 25}} /><br />

              Street Address: <br />
              <TextField
                id="address-field"
                type="text"
                value={this.state.address}
                style={{marginBottom: 25}} /><br />

              City: <br />
              <TextField
                id="city-field"
                type="text"
                value={this.state.city}
                style={{marginBottom: 25}}/><br />

              State: <br />
              <TextField
                id="state-zip-field"
                type="text"
                value={this.state.stateZip}
                style={{marginBottom: 25}}/><br />

              <FlatButton label="Submit" type="submit"/>


           </form>
          </div>
        </div>
      </Modal>
    )
  }
}


const customStyles = {
  content : {
    position: 'absolute',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};