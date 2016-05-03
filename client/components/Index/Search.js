import { browserHistory } from 'react-router';
import React, { PropTypes, Component} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getAllActivities } from '../../redux/actions'
import { Provider } from 'react-redux';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA"
    };
  }


  searchYelp(event) {
    // const contextTypes = {
    //   router: PropTypes.object
    // }
    event.preventDefault();

    console.log('search.js props: ', this.props);
    console.log('this.context: ', this.context);
    console.log('proptypes: ', PropTypes);

    getAllActivities({city: this.state.city, category: this.state.category}, this.context.router);
   

  }

  handleCategory(event) {
    this.setState({category: event.target.value});
  }

  handleCity(event) {
    this.setState({city: event.target.value});
  } 

  render() {
    return (
      <div className="col-sm-12">
        <form className="commentForm" onSubmit={this.searchYelp.bind(this)}>
          Search Category:
          <input
            type="text"
            value={this.state.value}
            placeholder="Category"
            onChange={this.handleCategory.bind(this)} />
          Select City:
          <select onChange={this.handleCity.bind(this)}>
            <option value="San Francisco, CA" >San Francisco</option>
            <option value="Oakland, CA" >Oakland</option>
            <option value="San Jose, CA" >San Jose</option>
          </select>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}


contextTypes: {
  router: PropTypes.object
}