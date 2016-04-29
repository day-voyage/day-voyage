var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;


class Search extends React.Component {
  render() {
    return (
      <div className="col-sm-12">
        <form>
          Search:
          <input type="text" name="search"></input>
          <button><Link to="/activities">Button</Link></button>
        </form>
      </div>
    );
  }
}

window.Search = Search;