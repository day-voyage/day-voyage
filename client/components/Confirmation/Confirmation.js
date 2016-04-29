var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Confirmation extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Confirmation Page</h1>
        <button><Link to="/">Go to home page</Link></button>
      </div>
    );
  }
}

window.Confirmation = Confirmation;