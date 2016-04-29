var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Activities extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Activities Page</h1>
        <button><Link to="/confirmation">go to confirmation page</Link></button>
      </div>
    );
  }
}

window.Activities = Activities;