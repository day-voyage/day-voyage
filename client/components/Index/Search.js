import { browserHistory } from 'react-router';
import * as React from 'react';
import { getAllActivities } from '../../redux/actions'

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

    getAllActivities({city: this.state.city, category: this.state.category});

    browserHistory.push({
      pathname: '/activities',
      query: {
        city: this.state.city,
        category: this.state.category
      }
    });

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