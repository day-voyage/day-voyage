import React, { Component } from 'react';
import Modal from 'react-modal';

export default class AutocompletePlaces extends Component {

  componentDidMount() {
      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));

      var input = document.getElementById('searchTextField');
      var options = { bounds: defaultBounds, types: ['establishment']}; 
      new google.maps.places.Autocomplete(input, options);
  }

  buttonClick() {
    alert(this.refs.searchField.getDOMNode().value);
  }

  render() {
    return (
      <div>     
        <label htmlFor="searchTextField">
          Please Insert an address:
        </label>
        <br/>
        <input ref='searchField' id="searchTextField" type="text" size="50"/>
        <br/>
        <button onClick={this.buttonClick}>Submit</button>
      </div>
    );
  }
};