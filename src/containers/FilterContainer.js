
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'


import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {
  checkCity,
  unCheckCity
} from '../actions'

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      priceSlider: this.props.maxPrice / 2,
      neighborhood: [],
      cuisines: [],
      checkBox: {
        marginBottom: 16
      }
    };
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleSlider(event, value) {
    this.setState({priceSlider: value});
    console.log(this.state.priceSlider)
  }

  componentWillMount() {
    const { activities } = this.props;

    var cities_id = []
    var citiesArr = []    
    var cuisineArr = []
    var cuisines_id = []

    activities.map((activity) => {
      for (var i = 0; i < activity.neighborhood.length; i++){
        if (cities_id.indexOf(activity.neighborhood[i].toUpperCase()) === -1) {
          cities_id.push(activity.neighborhood[i].toUpperCase())
          citiesArr.push({location: activity.neighborhood[i].toUpperCase(), visible: true})
        }
      }
    })

    activities.map((activity) => {
      for (var i = 0; i < activity.category.length; i++) {
        if (cuisines_id.indexOf(activity.category[i].toUpperCase()) === -1) {
          cuisines_id.push(activity.category[i].toUpperCase())
          cuisineArr.push({type: activity.category[i].toUpperCase(), visible: true}) 
        }       
      }
    })

    this.setState({
      neighborhood: citiesArr
    })

    this.setState({
      cuisines: cuisineArr
    })

  }

  handleCuisine(cuisine) {
    var cuisineArr = this.state.cuisines;
    var index = 0;

    // step through array, toggle visible
    for(var i = 0; i < cuisineArr.length; i++) {
      if(cuisineArr[i].type === cuisine && cuisineArr[i].visible === true) {
        cuisineArr[i].visible = false;

        console.log('toggle to false')

      } else if (cuisineArr[i].type === cuisine && cuisineArr[i].visible === false) {
        cuisineArr[i].visible = true;
        
      }
    }
  }

  handleCity(city) {    
    var citiesArr = this.state.neighborhood;
    var index = 0;

    // step through array, toggle visible
    for(var i = 0; i < citiesArr.length; i++) {
      if(citiesArr[i].location === city && citiesArr[i].visible === true) {
        citiesArr[i].visible = false;
        this.props.unCheckCity(city)
      } else if (citiesArr[i].location === city && citiesArr[i].visible === false) {
        citiesArr[i].visible = true;
        this.props.checkCity(city)
      }
    }
  }

  render() {

    var cityOptions = this.state.neighborhood.map((city, index) => {
      return ( 
          <Checkbox
          key={ index }
          label={city.location}
          defaultChecked={city.visible}
          style={this.state.checkBox.marginBottom}
          onCheck={(e) => this.handleCity(city.location)} />
        )
    })

    var cuisineOptions = this.state.cuisines.map((cuisine, index) => {
      return ( 
          <Checkbox
          key={ index }
          label={cuisine.type}
          defaultChecked={true}
          style={this.state.checkBox.marginBottom}
          onCheck={(e) => this.handleCuisine(cuisine.type)} />
        )
    })

    
    return (
      <div>
        <FlatButton label="Filter" onClick={this.toggleDrawer.bind(this)} />
        <Drawer open={this.state.drawerOpen}>
          <FlatButton label="Close Filter" onClick={this.toggleDrawer.bind(this)} />
          <div>
          <MenuItem>Budget ${this.state.priceSlider}</MenuItem>
          <Slider
            min={this.props.minPrice}
            max={this.props.maxPrice}
            step={1}
            defaultValue={this.props.maxPrice / 2}
            onChange={this.handleSlider.bind(this)}/>
          </div>

            <div>
            <MenuItem>Neighborhood</MenuItem>
            {cityOptions}
            </div>

            <div>
            <MenuItem>Cuisines</MenuItem>
            {cuisineOptions}
            </div>
        
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  }
}

export default connect(mapStateToProps, { checkCity, unCheckCity })(FilterContainer)