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
      category: 'active',
      cost: 0,
      address: '',
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
    var address = place.gmaps.formatted_address.split(', ').join('\n');

    var lat = place.location.lat;
    var long = place.location.lng;

    this.setState({
      address: address,
      lat: lat,
      long: long,
      categoryDropdown: 1,
    })
    
  }

  addNewEvent() {
    console.log(this.user_id)
    var activity = {
      // plan_id: null,
      activity_id: shortid.generate(),
      user_id: this.user_id,
      user_gen: true,
      private: this.state.private,
      desc: this.state.desc,
      lat: this.state.lat,
      long: this.state.long,
      address: this.state.address,
      title: this.state.title,
      costPerPerson: this.state.cost,
      isYelp: false,
      categories: this.state.category,
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
              <DropDownMenu
                 value={this.state.category}
                 onChange={this.handleCategory}
                 style={{width: 200}}
                 autoWidth={true}
               >
                 <MenuItem value={'active'} primaryText="Active" />
                 <MenuItem value={'arts & entertainment'} primaryText="Arts & Entertainment" />
                 <MenuItem value={'food'} primaryText="Food" />
                 <MenuItem value={'nightlife'} primaryText="Nightlife" />
                 <MenuItem value={'personal'} primaryText="Personal" />
                 <MenuItem value={'shopping'} primaryText="Shopping" />
               </DropDownMenu> <br />

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
              <img src='../assets/close.png' onClick={this.toggleModal.bind(this)} />
           </form>
          </div>
      </Dialog>
    )
  }
}

const modalStyle = {
  width: '50%'
}