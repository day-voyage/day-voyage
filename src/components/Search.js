// import { browserHistory } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { getAllActivities } from '../actions';
import { Provider } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';

// import {orange500, blue500} from 'material-ui/styles/colors';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA",
      lat: null,
      lng: null,
      location: null
    };
  }

  componentWillMount() {
    var that = this;
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      that.setState({
        lat: lat, 
        lng: lng
      });
    });
  }

  searchActivities(event) {
    event.preventDefault();
    // TODO: refactor below
    this.props.actions.getAllActivities({city: this.state.city, category: this.state.category}, this.state.location);
  }

  handleCategory(event) {
    this.setState({category: event.target.value});
  }

  handleCity(event){
    this.setState({city: event.target.value});
  }

  checkBox() {
    setTimeout(function() {
      var set = !this.state.location ? {lat: this.state.lat, lng: this.state.lng} : null;
        this.setState({
          location: set
        });
    }.bind(this), 0
    );
  }

  render() {
    return (
      <div className="col-sm-12">
        <form style={{textAlign: "center", marginTop: 25}} className="commentForm" onSubmit={this.searchActivities.bind(this)}>
          <TextField
            id="text-field-controlled"
            type="text"
            value={this.state.value}
            placeholder="Activities, Restaurants, or Places"
            style={{marginBottom: 25}}
            onChange={this.handleCategory.bind(this)} />
          {!this.state.location ? <span>  in  </span> : null}
          {!this.state.location ? <TextField
            id="text-field-controlled"
            type="text"
            value={this.state.city}
            defaultValue={this.state.city}
            style={{marginBottom: 25}}
            onChange={this.handleCity.bind(this)} /> : null}
          <FlatButton label="Search" onClick={this.searchActivities.bind(this)}/>
        </form>
        {this.state.lat ? <Checkbox
          label="Use Current Location"
          labelPosition="left"
          style={{maxWidth: 190, align: "right"}}
          onCheck={this.checkBox.bind(this)} />: <CircularProgress />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);


/*
<h5>Select City: </h5>
<SelectField value={this.state.city} onChange={this.handleCity.bind(this)}>
  <MenuItem value="San Francisco, CA" primaryText="San Francisco, CA" />
  <MenuItem value="Oakland, CA" primaryText="Oakland, CA" />
  <MenuItem value="San Jose, CA" primaryText="San Jose, CA" />
</SelectField><br />
 */
