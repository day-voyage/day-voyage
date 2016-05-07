import React, { Component } from 'react';
import Modal from 'react-modal';


export default class CreateActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: '',
      address: '',
      city: '',
      state: ''
    };
  }

  componentDidMount() {
    if (this.props.open) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.props.toggleModal();
  }

  addEvent(event) {
    event.preventDefault();
    console.log("add event!");
    this.props.toggleModal();
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleAddress(event) {
    this.setState({address: event.target.value});
  }

  handleCity(event) {
    this.setState({city: event.target.value});
  }

  handleState(event) {
    this.setState({state: event.target.value});
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        style={customStyles} >
        <div className="container">
          <div className="row">
            <img src='../../assets/close.png' onClick={this.toggleModal.bind(this)} />
            <h2>Create your own activity</h2>

            <form style={{textAlign: "left", marginTop: 10}} className="commentForm" onSubmit={this.addEvent.bind(this)}>
              <h5>Name:</h5>
              Name: <input type="text" value={this.state.name} placeholder="Name" style={{marginBottom: 10}} onChange={this.handleName.bind(this)} /><br />
              Address: <input type="text" value={this.state.address} placeholder="Address" style={{marginBottom: 10}} onChange={this.handleAddress.bind(this)} /><br />
              City: <input type="text" value={this.state.city} placeholder="City" style={{marginBottom: 10}} onChange={this.handleCity.bind(this)} /><br />
              State:
              <select onChange={this.handleState.bind(this)}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select><br />
              <input type="submit" value="Add Activity!" />
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};