import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import Geosuggest from 'react-geosuggest/module/Geosuggest';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var shortid = require('shortid');


export default class CreateActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      title: '',
      desc: '',
      cost: 0,
      address: '',
      city: '',
      neighborhood: '',
      statePlace: '',
      completeAddress: '',
      lat: '',
      long: '',
      private: false,
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

  handleDesc(event) {
    this.setState({desc: event.target.value});
  }

  handleCategory(event, index, value){
    this.setState({category: value})
    console.log('category: ', category);
  }

  handleCost(event) {
    this.setState({cost: event.target.value})
  }

  handleAddress(event) {
    this.setState({address: event.target.value});
  }

  handlePrivate() {
    this.setState({private: !this.state.private});
  }


  onSuggestSelect(place) {
    console.log(place);
    // var address = place.gmaps.formatted_address.split(', ').join('\n');
    var streetNum;
    var street;
    var neighborhood = [];
    var city;
    var statePlace;

    place.gmaps.address_components.forEach((component) => {
      var type = component.types[0];

      if (type === 'street_number') streetNum = component.long_name;
      else if (type === 'route') street = component.long_name;
      else if (type === 'neighborhood') neighborhood.push(component.long_name);
      else if (type === 'locality') city = component.long_name;
      else if (type === 'administrative_area_level_1') statePlace = component.short_name;
    })

    var lat = place.location.lat;
    var long = place.location.lng;

    this.setState({
      address: streetNum + ' ' + street,
      neighborhood: neighborhood,
      city: city,
      state: statePlace,
      completeAddress: 'Street: ' + streetNum + ' ' + street + '\nCity: ' + city + '\nState: ' + statePlace,
      lat: lat,
      long: long
    })

  }

  addNewEvent() {
    var e = document.getElementById('create-activity-category');
    var selectedCategory = e.options[e.selectedIndex].value;

    var activity = {
      clientside_id: shortid.generate(),
      user_id: this.user_id,
      user_gen: true,
      private: this.state.private,
      desc: this.state.desc,
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      city: this.state.city,
      neighborhood: this.state.neighborhood,
      state: this.state.statePlace,
      title: this.state.title,
      costPerPerson: this.state.cost,
      isYelp: false,
      categories: selectedCategory,
      added: true
    };
    this.props.addFromCreate(activity);
    this.props.toggleModal();
    this.props.openSnackbar("Event has been created");
    this.props.saveToDb(activity);
  }

  render() {
   return (
      <Dialog
        open={this.props.modal}
        modal={true}
        contentStyle={modalStyle}
        autoScrollBodyContent={true}>
          <div>
            <h2 style={{marginTop: 10, marginBottom: 30}}>Create your own activity</h2>

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
                placeholder="Birthday Party"
                style={{marginBottom: 25}} /><br />

              Category: <br />
              <select id="create-activity-category">
                <option value="Active">Active</option>
                <option value="Arts & Entertainment">Arts & Entertainment</option>
                <option value="Food">Food</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
              </select><br />

              Estimated Cost: <br />
              $
              <TextField
                className="text-field"
                id="desc-field"
                type="number"
                onChange={this.handleCost.bind(this)}
                placeholder="20"
                style={{marginBottom: 25}} /><br />

              Address: <br />
              <Geosuggest
                placeholder="123 Grove St."
                onSuggestSelect={this.onSuggestSelect.bind(this)}
                location={new google.maps.LatLng(37.7749295, -122.41941550000001)}
                radius="20" />
              <TextField
                className="text-field"
                id="address-field"
                disabled={true}
                multiLine={true}
                rows={3}
                onChange={this.handleAddress.bind(this)}
                value={this.state.completeAddress}
                style={{marginBottom: 25}} /><br />
              <Toggle
                label="Private"
                labelPosition="right"
                onToggle={this.handlePrivate.bind(this)}
                defaultToggled={false} />
              <FlatButton
                label="Add to itinerary"
                onClick={this.addNewEvent.bind(this)}/>
              <FlatButton
                label="Cancel"
                onClick={this.toggleModal.bind(this)} />
           </form>
          </div>
      </Dialog>
    )
  }
}

const modalStyle = {
  width: '50%'
}
