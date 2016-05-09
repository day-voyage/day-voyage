import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import GOOGLE_API_KEY from '../../config/googlePlaces'

import Toggle from 'material-ui/Toggle';
import Geosuggest from 'react-geosuggest/module/Geosuggest';

export default class CreateActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      title: '',
      address: '',
      desc: '',
      lat: '',
      long: '',
      private: false
    };
  }

  /* The following gets the user's location to optimize autocomplete search*/
  // componentWillMount() {
  //   navigator.geolocation.getCurrentPosition(function(pos) {
  //     this.setState({
  //       lat: pos.coords.latitude,
  //       long: pos.coords.longitude
  //     })
  //     console.log(this.state.lat);
  //     console.log(this.state.long);
  //   }, function(err) {
  //     // else error grabbing location, just return SF's coords
  //     this.setState({
  //       lat: 37.7749295,
  //       long: -122.41941550000001
  //     })
  //   });
  // }

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

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleAddress(event) {
    this.setState({address: event.target.value});
  }

  handleDesc(event) {
    this.setState({desc: event.target.value});
  }

  handlePrivate() {
    this.setState({private: this.state.private});
  }

  onSuggestSelect(place) {
    console.log(place);
    var address = place.gmaps.formatted_address.split(', ').join('\n');

    var lat = place.location.lat;
    var long = place.location.lng;

    this.setState({
      address: address,
      lat: lat,
      long: long
    })

  }

  addNewEvent() {
    var activity = {
      title: this.state.title,
      address: this.state.address,
      desc: this.state.desc,
      lat: this.state.lat,
      long: this.state.long,
      category: 'personal',
      private: this.state.private,
      added: true
    }
    this.props.addFromCreate(activity);
    this.props.toggleModal();
    this.props.openSnackbar("Event has been created");
}

  render() {

    return (
       <Dialog
        open={this.props.modal}
        modal={true}
        contentStyle={customContentStyle}
        autoScrollBodyContent={true}
        style={customContentStyle} >
        <div className="container">
          <div className="row">
            <h2>Create your own activity</h2>

            <form style={{textAlign: "left", marginTop: 10}} className="commentForm">
              Title: <br />
              <TextField
                className="text-field"
                id="name-field"
                type="text"
                onChange={this.handleTitle.bind(this)}
                placeholder="Friend's Place"
                style={{marginBottom: 25}} /><br />

              Description: <br />
              <TextField
                className="text-field"
                id="desc-field"
                type="text"
                onChange={this.handleDesc.bind(this)}
                placeholder="Dinner party"
                style={{marginBottom: 25}} /><br />

              Address: <br />
              <Geosuggest
                className="geosuggest"
                placeholder="123 Grove St."
                onSuggestSelect={this.onSuggestSelect.bind(this)}
                location={new google.maps.LatLng(37.7749295, -122.41941550000001)}
                radius="20" />

              <TextField
                className="text-field"
                id="address-field"
                disabled={true}
                multiLine={true}
                rows={4}
                onChange={this.handleAddress.bind(this)}
                value={this.state.address}
                style={{marginBottom: 25}} /><br />

              <Toggle
                label="Private"
                labelPosition="right"
                onToggle={this.handlePrivate.bind(this)}
                defaultToggled={false} />
              <FlatButton
                label="Add to itinerary"
                onClick={this.addNewEvent.bind(this)}/>
              <img src='../../assets/close.png' onClick={this.toggleModal.bind(this)} />
           </form>
          </div>
        </div>
      </Dialog>
    )
  }
}

const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
};
