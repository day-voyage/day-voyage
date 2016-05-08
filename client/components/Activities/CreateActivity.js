import React, { Component } from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
              <TextField
                id="text-field-controlled"
                type="text"
                value={this.state.name}
                placeholder="Name"
                style={{marginBottom: 25}}
                onChange={this.handleName.bind(this)} /><br />
              <TextField
                id="text-field-controlled"
                type="text"
                value={this.state.address}
                placeholder="Address"
                style={{marginBottom: 25}}
                onChange={this.handleAddress.bind(this)} /><br />
              <TextField
                id="text-field-controlled"
                type="text"
                value={this.state.city}
                placeholder="City"
                style={{marginBottom: 25}}
                onChange={this.handleCity.bind(this)} /><br />
              <SelectField value={this.state.state} onChange={this.handleState.bind(this)}>
                <MenuItem value="AL" primaryText="Alabama" />
                <MenuItem value="AK" primaryText="Alaska" />
                <MenuItem value="AZ" primaryText="Arizona" />
                <MenuItem value="AR" primaryText="Arkansas" />
                <MenuItem value="CA" primaryText="California" />
                <MenuItem value="CO" primaryText="Colorado" />
                <MenuItem value="CT" primaryText="Connecticut" />
                <MenuItem value="DE" primaryText="Delaware" />
                <MenuItem value="DC" primaryText="District Of Columbia" />
                <MenuItem value="FL" primaryText="Florida" />
                <MenuItem value="GA" primaryText="Georgia" />
                <MenuItem value="HI" primaryText="Hawaii" />
                <MenuItem value="ID" primaryText="Idaho" />
                <MenuItem value="IL" primaryText="Illinois" />
                <MenuItem value="IN" primaryText="Indiana" />
                <MenuItem value="IA" primaryText="Iowa" />
                <MenuItem value="KS" primaryText="Kansas" />
                <MenuItem value="KY" primaryText="Kentucky" />
                <MenuItem value="LA" primaryText="Louisiana" />
                <MenuItem value="ME" primaryText="Maine" />
                <MenuItem value="MD" primaryText="Maryland" />
                <MenuItem value="MA" primaryText="Massachusetts" />
                <MenuItem value="MI" primaryText="Michigan" />
                <MenuItem value="MN" primaryText="Minnesota" />
                <MenuItem value="MS" primaryText="Mississippi" />
                <MenuItem value="MO" primaryText="Missouri" />
                <MenuItem value="MT" primaryText="Montana" />
                <MenuItem value="NE" primaryText="Nebraska" />
                <MenuItem value="NV" primaryText="Nevada" />
                <MenuItem value="NH" primaryText="New Hampshire" />
                <MenuItem value="NJ" primaryText="New Jersey" />
                <MenuItem value="NM" primaryText="New Mexico" />
                <MenuItem value="NY" primaryText="New York" />
                <MenuItem value="NC" primaryText="North Carolina" />
                <MenuItem value="ND" primaryText="North Dakota" />
                <MenuItem value="OH" primaryText="Ohio" />
                <MenuItem value="OK" primaryText="Oklahoma" />
                <MenuItem value="OR" primaryText="Oregon" />
                <MenuItem value="PA" primaryText="Pennsylvania" />
                <MenuItem value="RI" primaryText="Rhode Island" />
                <MenuItem value="SC" primaryText="South Carolina" />
                <MenuItem value="SD" primaryText="South Dakota" />
                <MenuItem value="TN" primaryText="Tennessee" />
                <MenuItem value="TX" primaryText="Texas" />
                <MenuItem value="UT" primaryText="Utah" />
                <MenuItem value="VT" primaryText="Vermont" />
                <MenuItem value="VA" primaryText="Virginia" />
                <MenuItem value="WA" primaryText="Washington" />
                <MenuItem value="WV" primaryText="West Virginia" />
                <MenuItem value="WI" primaryText="Wisconsin" />
                <MenuItem value="WY" primaryText="Wyoming" />
              </SelectField><br />
              <FlatButton label="Submit" type="submit"/>
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