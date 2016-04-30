var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 1, bar: 'abc', price: '100', lat: 100, lon: 50},
        {id: 2, bar: 'def', price: '1', lat: 100, lon: 50},
        {id: 3, bar: 'ghi', price: '1000', lat: 100, lon: 50},
        {id: 4, bar: 'jkl', price: '500', lat: 100, lon: 50},
        {id: 5, bar: 'mno', price: '1500', lat: 100, lon: 50},
        {id: 6, bar: 'pqr', price: '1050', lat: 100, lon: 50},
        {id: 7, bar: 'stu', price: '1050', lat: 100, lon: 50},
        {id: 8, bar: 'vwx', price: '55100', lat: 100, lon: 50},
        {id: 9, bar: 'yz', price: '15500', lat: 100, lon: 50},
        {id: 10, bar: 'abc', price: '1500', lat: 100, lon: 50},
        {id: 11, bar: 'def', price: '1', lat: 100, lon: 50},
        {id: 12, bar: 'ghi', price: '2', lat: 100, lon: 50},
        {id: 13, bar: 'jkl', price: '3', lat: 100, lon: 50},
        {id: 14, bar: 'mno', price: '4', lat: 100, lon: 50},
        {id: 15, bar: 'pqr', price: '6', lat: 100, lon: 50}
      ],
      red: 0,
      green: 0,
      blue: 0
    }
    this.update = this.update.bind(this)
  }

  update(event) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    })
  }

  // getInitialState() {
  //   return {
  //     planner: {}
  //   }
  // }

  render() {
      let rows = this.state.data.map( activity => {
        return <ActivitiesRow key={activity.id} data={activity} />
      })

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Filter</h1>
            <br />
            <br />
            <Filter ref="red" update={this.update} />
            <Filter ref="green" update={this.update} />
            <Filter ref="blue" update={this.update} />
          </div>

          <div className="col-md-4">
            <h1>Activities Page</h1>
            <button><Link to="/confirmation">go to confirmation page</Link></button>
              <br />
              <br />
              {this.state.red}
              <br />
              {this.state.green}
              <br />
              {this.state.blue}
              <br />


              <table>
                <tbody>{rows}</tbody>
              </table>
              
          </div>


            <BuildPlanner />
        </div>
      </div>
    );
  }
}




const ActivitiesRow = (props) => {
  return (
      <tr>
        <td>{props.data.id}</td>
        <td>{props.data.bar}</td>
        <td>{props.data.price}</td>
        <td>{props.data.lat}</td>
        <td>{props.data.lon}</td>
      </tr>
  )
}

window.Activities = Activities;