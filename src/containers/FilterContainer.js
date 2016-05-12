
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { checkArea } from '../actions';

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      priceSlider: this.props.maxPrice / 2,
      neighborhood: [],
      cuisines: []
    };
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleSlider(event, value) {
    this.setState({priceSlider: value});
    console.log(this.state.priceSlider);
  }

  componentWillMount() {
    const { activities } = this.props;

    var areas_id = [];
    var areasArray = [];    
    var cuisineArr = [];
    var cuisines_id = [];

    activities.forEach((activity) => {
      for (var i = 0; i < activity.neighborhood.length; i++){
        if (areas_id.indexOf(activity.neighborhood[i].toUpperCase()) === -1) {
          areas_id.push(activity.neighborhood[i].toUpperCase());
          areasArray.push({location: activity.neighborhood[i].toUpperCase(), visible: true});
        }
      }
      for (var i = 0; i < activity.category.length; i++) {
        if (cuisines_id.indexOf(activity.category[i].toUpperCase()) === -1) {
          cuisines_id.push(activity.category[i].toUpperCase());
          cuisineArr.push({type: activity.category[i].toUpperCase(), visible: true}) ;
        }       
      }
    })

    areasArray.sort((a, b) => a.location > b.location);
    cuisineArr.sort((a, b) => a.type > b.type);


    this.setState({
      neighborhood: areasArray,
      cuisines: cuisineArr
    });
  }

  handleCuisine(cuisine) {
    var cuisineArr = this.state.cuisines;
    var index = 0;

    // step through array, toggle visible
    for(var i = 0; i < cuisineArr.length; i++) {
      if(cuisineArr[i].type === cuisine && cuisineArr[i].visible === true) {
        cuisineArr[i].visible = false;
      } else if (cuisineArr[i].type === cuisine && cuisineArr[i].visible === false) {
        cuisineArr[i].visible = true;
      }
    }
  }

  handleArea(area) {    
    var areasArray = this.state.neighborhood;
    var index = 0;
    // step through array, toggle visible
    for(var i = 0; i < areasArray.length; i++) {
      if(areasArray[i].location === area) {
        areasArray[i].visible = !areasArray[i].visible;
      }
    }

    var checkedAreas = 
      areasArray.filter(item => item.visible === true)
                .map(item => item.location);

console.log('checkedAreas: ', checkedAreas);

    this.props.checkArea(checkedAreas);
  }

  render() {

    var areaOptions = this.state.neighborhood.map((area, index) => {
      return ( 
        <Checkbox
          key={ index }
          label={area.location}
          defaultChecked={area.visible}
          style={{marginBottom: 16}}
          onCheck={(e) => this.handleArea(area.location)} />
        )
    })

    var cuisineOptions = this.state.cuisines.map((cuisine, index) => {
      return ( 
        <Checkbox
          key={ index }
          label={cuisine.type}
          defaultChecked={true}
          style={{marginBottom: 16}}
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
            {areaOptions}
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

export default connect(mapStateToProps, { checkArea })(FilterContainer)