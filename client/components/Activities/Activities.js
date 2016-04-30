var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Activities extends React.Component {

  constructor(props) {
    super(props);
  }

  // getInitialState() {
  //   return {
  //     planner: {}
  //   }
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Filter />
          <div className="col-md-4">
            <h1>Activities Page</h1>
            <button><Link to="/confirmation">go to confirmation page</Link></button>
          </div>
            <PlanBuilder />
        </div>
      </div>
    );
  }
}

window.Activities = Activities;