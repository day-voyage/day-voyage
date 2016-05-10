import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      priceSlider: this.props.maxPrice / 2,
      cities: [
        {location: 'Downtown',
        visible: true},
        {location: 'The Mission',
        visible: true},
        {location: 'Fillmore District',
        visible: true},
        {location: 'Hayes Valley',
        visible: true},
        {location: 'Marina District',
        visible: true},
        {location: 'Presidio Heights',
        visible: true}
      ],
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

  handleCity(event, value) {
    console.log('event ', event.target.value)
    console.log('value ', event.target)
  }

  render() {
    
    var cityOptions = (this.state.cities.map((city) => {
              return (
                <Checkbox index={city.id}
                  label={city.location}
                  defaultChecked={true}
                  style={this.state.checkBox.marginBottom}
                  onCheck={this.handleCity.bind(this)} />
              )
          }))

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
        

        </Drawer>
      </div>
    );
  }
}
