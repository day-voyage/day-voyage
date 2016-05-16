
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { checkArea, checkCuisine, checkBudget } from '../actions';
import { sliderclass } from './styles.css';

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      neighborhood: [],
      cuisines: [],
      minPrice: 0,
      maxPrice: 0,
      priceSlider: 0
    };
  }

  componentWillMount() {
    const { activities } = this.props;

    var areas_id = [];
    var areasArray = [];    
    var cuisineArr = [];
    var cuisines_id = [];
    var maxBudget = 0;

    console.log(activities)

    activities.forEach((activity) => {
      for (var i = 0; i < activity.neighborhood.length; i++){
        if (areas_id.indexOf(activity.neighborhood[i].toUpperCase()) === -1) {
          areas_id.push(activity.neighborhood[i].toUpperCase());
          areasArray.push({location: activity.neighborhood[i].toUpperCase(), visible: true});
            if(activity.budget > maxBudget) {
              maxBudget = activity.budget;
              console.log('maxBudget ', maxBudget)
              console.log('activityBudget ', activity.budget)
            }
        }
      }
      for (var i = 0; i < activity.category.length; i++) {
        if (cuisines_id.indexOf(activity.category[i].toUpperCase().replace(/\s/g,'')) === -1) {
          cuisines_id.push(activity.category[i].toUpperCase().replace(/\s/g, ''));
          cuisineArr.push({type: activity.category[i].toUpperCase().replace(/\s/g, ''), visible: true});
        }       
      }
    })

    areasArray.sort((a, b) => a.location > b.location);
    cuisineArr.sort((a, b) => a.type > b.type);

    this.setState({
      neighborhood: areasArray,
      cuisines: cuisineArr,
      maxPrice: Math.round(maxBudget) + 10,
      priceSlider: Math.round(maxBudget) + 10
    });
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleSlider(event, value) {
    var budget = Math.round(value);

    this.setState({priceSlider: budget});
    
    ///this.props.checkBudget(budget)
    console.log(budget);
    this.props.checkBudget(budget);



  }

  handleCuisine(cuisine) {
    var cuisineArr = this.state.cuisines;
    var index = 0;
    // step through array, toggle visible
    for(var i = 0; i < cuisineArr.length; i++) {
      if(cuisineArr[i].type === cuisine) {
        cuisineArr[i].visible = !cuisineArr[i].visible;
      }
    }

    var checkedCuisines = 
      cuisineArr.filter(item => item.visible === true)
                .map(item => item.type);

      console.log('checkedCuisines: ', checkedCuisines)

      this.props.checkCuisine(checkedCuisines)
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
          style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}
          onCheck={(e) => this.handleArea(area.location)} />
        )
    })

    var cuisineOptions = this.state.cuisines.map((cuisine, index) => {
      return ( 
        <Checkbox
          key={ index }
          label={cuisine.type}
          defaultChecked={cuisine.visible}
          style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}
          onCheck={(e) => this.handleCuisine(cuisine.type)} />
      )
    })
    
    return (
      <div>
        <FlatButton label="Filter" onClick={this.toggleDrawer.bind(this)} />
        <Drawer open={this.state.drawerOpen}>
          <FlatButton label="Close Filter" onClick={this.toggleDrawer.bind(this)} />
          <div>
          
          
          <MenuItem>
          Budget ${this.state.priceSlider}</MenuItem>
          <Slider
            style={{marginLeft: 25, marginRight: 25}}
            min={this.state.minPrice}
            max={this.state.maxPrice}
            step={0.01}
            className="slider-class"
            defaultValue={this.state.maxPrice}
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

export default connect(mapStateToProps, { checkArea, checkCuisine, checkBudget })(FilterContainer)