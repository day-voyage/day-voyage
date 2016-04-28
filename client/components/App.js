var ReactRouter = window.ReactRouter;
let RouteHandler = ReactRouter.RouteHandler;
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let browserHistory = ReactRouter.browserHistory;


class App extends React.Component {
  render() {
    console.log(Router);
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
