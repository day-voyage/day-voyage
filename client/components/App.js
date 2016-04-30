var ReactRouter = window.ReactRouter;
var RouteHandler = ReactRouter.RouteHandler;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;


class App extends React.Component {

  render() {
    return (
      <div>
        <Nav />
          <Router history={ browserHistory }>
            <Route path="/" component={ Index }></Route>
            <Route path="/activities" component={ Activities }></Route>
            <Route path="/confirmation" component={ Confirmation }></Route>
            <Route path="/*" component={ Index }></Route>
          </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
