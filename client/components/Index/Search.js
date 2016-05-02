import { Link } from 'react-router';
import * as React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }


  searchYelp(event) {
    event.preventDefault();

    fetch(`/api/yelpSearch?city=${this.state.value}`, {
      method: 'GET'
    }).then((results) => results.json()).then((data) => console.log(data))
    .catch(e => console.log(e));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="col-sm-12">
        <form className="commentForm" onSubmit={this.searchYelp.bind(this)}>
          Search:
          <input
            type="text"
            value={this.state.value}
            placeholder="Category"
            onChange={this.handleChange.bind(this)} />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}