import { Link } from 'react-router';
import * as React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA"
    };
  }


  searchYelp(event) {
    event.preventDefault();
    console.log(this.state.city);
    console.log(this.state.category);

    fetch(`/api/yelpSearch?city=${this.state.city}&category=${this.state.category}`, {
      method: 'GET'
    })
    .then((results) => results.json()).then((data) => 
      console.log("yelp data:", data));
      fetch('http://localhost:3000/v1/activities', {
        method: 'GET'
      })
      .then((dbResults) => dbResults.json()).then((dbData) => console.log("db Data:", dbData.data))
    .catch(e => console.log(e));
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