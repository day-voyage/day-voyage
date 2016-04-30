var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Filter extends React.Component {
  render(){
    return (
      <div>
        <input ref="inp" type="range"
        min="0"
        max="255"
        onChange={this.props.update} />
      </div>
    )
  }
}

window.Filter = Filter;