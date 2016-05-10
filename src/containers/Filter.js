import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      priceSlider: this.props.maxPrice / 2
    });
  }

  handleSlider(event, value) {
    this.setState({priceSlider: value});
    console.log(this.state.priceSlider)
  }
  
  render() {
    return (
      <div>
        <FlatButton label="Filter" onClick={this.toggleDrawer.bind(this)} />
        <Drawer open={this.state.drawerOpen}>
          <FlatButton label="Close Filter" onClick={this.toggleDrawer.bind(this)} />
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        
          <div>
          <MenuItem>Budget</MenuItem>
          <Slider
            min={this.props.minPrice}
            max={this.props.maxPrice}
            step={1}
            defaultValue={this.props.maxPrice / 2}
            onChange={this.handleSlider.bind(this)}/>
          </div>

        </Drawer>
      </div>
    );
  }
}
