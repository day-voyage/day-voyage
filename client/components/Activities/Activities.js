var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Activities extends React.Component {

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-4">
        <h1>Activities Page</h1>
        <button><Link to="/confirmation">go to confirmation page</Link></button>
      </div>
      <div className="col-md-4">
        Builder Component
      </div>
      </div>
      </div>
    );
  }
}

window.Activities = Activities;