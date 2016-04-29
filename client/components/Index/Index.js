var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;


class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Search />
      </div>
    );
  }
}

window.Index = Index;