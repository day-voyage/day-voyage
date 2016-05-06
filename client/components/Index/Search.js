import { browserHistory } from 'react-router';
import React, { PropTypes, Component} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getAllActivities } from '../../redux/actions';
import { Provider } from 'react-redux';

export default class Search extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA"
    };
  }


  searchYelp(event) {
    event.preventDefault();

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
        <form style={{textAlign: "center", marginTop: 25}} className="commentForm" onSubmit={this.searchYelp.bind(this)}>
          <h5>Search Category: </h5>
          <input
            type="text"
            value={this.state.value}
            placeholder="Category"
            style={{marginBottom: 25}}
            onChange={this.handleCategory.bind(this)} />
          <h5>Select City: </h5>
          <select onChange={this.handleCity.bind(this)}>
            <option value="San Francisco, CA" >San Francisco</option>
            <option value="Oakland, CA" >Oakland</option>
            <option value="San Jose, CA" >San Jose</option>
          </select><br />
          <input type="submit" 
                 value="Search" />
        </form>
      </div>
    );
  }
}