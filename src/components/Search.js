import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import ActionSearch from 'material-ui/svg-icons/action/search';
import * as utils from '../utils';


export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA",
      lat: null,
      lng: null,
      location: null,
      geolocation: true
    };
  }

  componentDidMount() {
    var that = this;
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      that.setState({
        lat: lat,
        lng: lng
      });
    }, (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        that.setState({
          geolocation: false
        });
      }
    });
  }

  searchActivities(event) {
    event.preventDefault();
    // if doing search by geolocation...
    if (this.state.location) {
      // use reverse geocoding to change our location to city name
      var latLng = [this.state.lat,this.state.lng].join(',');
      fetch(`/api/reversegeocode?location=${latLng}`, {
        method: 'GET'
      })
      .then((cityData) => cityData.json())
      .then((cityInfo) => {
        var city = cityInfo.formatted_address.split(", ")[1];
        // run redux action getAllActivities with our geolocation city, category, and current location (lat and lng)
        this.props.actions.getAllActivities({city: city, category: this.state.category}, this.state.location);
      });
      // otherwise run redux action getAllActivities with typed in city and category
    } else {
      this.props.actions.getAllActivities({city: this.state.city, category: this.state.category}, null);
    }
  }

  handleCategory(event) {
    this.setState({category: event});
  }

  handleCity(event){
    this.setState({city: event});
  }

  checkBox() {
    setTimeout(function() {
      var set = !this.state.location ? {lat: this.state.lat, lng: this.state.lng} : null;
        this.setState({
          location: set,
        });
    }.bind(this), 0
    );
  }


  triggerAPItest() {
    console.log('triggering API test');

    // utils.searchActivities('a', 'san francisco', activities => console.log('activity matches are',activities));

    // utils.getActivitiesByUser(3, (result) => console.log('got activities from aws', result));

    // utils.searchPlans('d', 'san francisco', plans => console.log('plan matches are',plans));

    // this.props.actions.createPlan({desc: 'woopie', 'title': 'voyage'}, [{activity_id: 10, title: 'watermelon'}], response => console.log('Posted it!', response));

    // utils.updatePlan(1, {title: 'ooo PA'},[{activity_id: 3, title:'do it to meybabt'}, {activity_id: 4, title:'DA BOMB', desc: 'a man walks to a church, ha'}], result => console.log(result));


    // utils.getPlansByUser(5, result => console.log(result));

//>>>>>>>>>>>>>>>>>>>>>>> test these on live connection
//
    // utils.updateActivity(2, {duration: 88}, (response) => console.log(response));

    // utils.updatePlan(3, {desc: `Is there anything different all a description`, title: 'Afternoon delight'}, [{id: 9, user_gen: true}], result => console.log('updated plan >>', result));

    // utils.updateUser(2, {username: 'Iamsam'}, result => console.log('updated user', result));

    // utils.getActivitiesByPlan(5, activities => console.log(activities));

    // this.props.actions.deleteActivityFromDb(13, (result) => console.log(result));


    // utils.getPlan(2, (result) => console.log(result));

    // utils.getPlan(1, (result) => console.log(result));


    // utils.getAllPlans(plans => console.log(plans));

    // utils.queryTable('activities', {user_gen: true, city: 'San Francisco', 'title': 'a'}, (result) => console.log(result));

    // utils.deletePlan(4, (plan) => console.log(plan));

    // utils.getComments('user', 4, comment => console.log(comment));

    // utils.getComments('activity', 3, comment => console.log(comment));

    // utils.createComment({
    //   content: 'HODOR HODOR',
    //   user_id: 3,
    //   plan_id: 5
    // }, (result) => console.log('result', result));

  }

  render() {

    var spinner = this.state.lat ?
      <Checkbox
        label="Use current location"
        iconStyle={checkboxIconStyle}
        labelStyle={checkboxLabelStyle}
        onCheck={this.checkBox.bind(this)} /> :
        <div>
          getting your current location... <br />
          <LinearProgress
            mode="indeterminate"
            color={"#FF9800"}
            style={{width: 100}}/>
        </div>

    return (
      <div className="search">
        <form className="search-form" onSubmit={this.searchActivities.bind(this)}>
          <div className="search-form__inputs">
            <ActionSearch className="hidden-xs" />
            <AutoComplete
              floatingLabelText="Activities, Restaurants, or Places"
              fullWidth={true}
              style={{width: '450px'}}
              className="search-form__activity-input"
              filter={AutoComplete.fuzzyFilter}
              dataSource={catSearch}
              maxSearchResults={6}
              value={this.state.value}
              onUpdateInput={this.handleCategory.bind(this)} />
            <div className="search-form__separator">in</div>
            <AutoComplete
              floatingLabelText="City"
              fullWidth={true}
              style={{width: '300px'}}
              className="search-form__activity-input"
              filter={AutoComplete.fuzzyFilter}
              dataSource={citySearch}
              maxSearchResults={3}
              value={this.state.city}
              disabled={this.state.location}
              onUpdateInput={this.handleCity.bind(this)} />
            <input type="submit" style={{opacity: 0, width: 0, height: 0, padding: 0}} />
          </div>
          <div className="search__location-checkbox">
            { spinner }
          </div>
        </form>
        <div className="search__call-to-action">
          <RaisedButton primary="true" className="search-btn" label="Start Planning Your Trip" onClick={this.searchActivities.bind(this)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

const checkboxIconStyle = {
  // fill: '#424242'
};

const checkboxLabelStyle = {
  color: '#424242',
  'fontWeight': 'normal'
}

const catSearch = ['Active', 'Arts & Entertainment', 'Food', 'Nightlife', 'Personal', 'Shopping'];
const citySearch = ['San Francisco', 'Oakland', 'San Jose'];

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
