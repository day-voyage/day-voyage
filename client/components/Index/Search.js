var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  searchYelp(event) {
    event.preventDefault();
    console.log(this.state.value);
    fetch('yelpSearch', function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    });
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

window.Search = Search;