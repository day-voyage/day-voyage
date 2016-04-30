var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Filter extends React.Component {
  constructor(){
    super();
    this.state = {
      txt: 'this is the state txt'
    }
  }

  update(event) {
    this.setState({
      txt: e.target.value
    })
  }

  render() {
    return (
      <div className="col-md-4">
        <input type="text"
          onChange={this.update.bind(this)} />
          <h1>{this.state.txt}</h1>
      </div>
    );
  }
}

window.Filter = Filter;