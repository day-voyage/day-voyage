import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

// username - cannot update
// first name
// last name
// email
// change password, enter current password
// new password x2

export default class UpdateProfile extends Component {
 constructor(props) {
     super(props);

     this.state = {
       firstName: 'First Name',
       lastName: 'Last Name',
       email: 'Email'
     };
   }

   handleFirstNameChange = (event) => {
     this.setState({
       firstName: event.target.firstName
     });
   };

   handleLastNameChange = (event) => {
     this.setState({
       lastName: event.target.lastName
     });
   };

   handleEmailChange = (event) => {
     this.setState({
       email: event.target.email
     });
   };

   render() {
    // const styles = {
    //   errorStyle: {
    //     color: orange500,
    //   },
    //   underlineStyle: {
    //     borderColor: orange500,
    //   },
    //   floatingLabelStyle: {
    //     color: orange500,
    //   },
    //   floatingLabelFocusStyle: {
    //     color: blue500,
    //   },
    // };


     return (
       <div>
         <TextField
           id="text-field-controlled"
           defaultValue={this.state.firstName}
           // value={this.state.firstName}
           onChange={this.handleFirstNameChange}
           // hintStyle={styles.errorStyle}
         /><br />
         <TextField
           id="text-field-controlled"
           defaultValue={this.state.lastName}
           value={this.state.lastName}
           onChange={this.handleLastNameChange}
           // hintStyle={styles.errorStyle}
         /><br />
         <TextField
           id="text-field-controlled"
           defaultValue={this.state.email}
           value={this.state.email}
           onChange={this.handleEmailChange}
           errorText="This field is required."
         /><br />
         <TextField
           hintText="Current Password"
           floatingLabelText="Password"
           type="password"
           errorText="This field is required."
         /><br />
         <TextField
            floatingLabelText="New Password"
            floatingLabelFixed={true}
            type="password"
            // errorText="This field is required."
          /><br />
         <TextField
           floatingLabelText="Re-enter New Password"
           type="password"
           // errorText="This field is required."
         /><br />
       </div>
     );
   }
 }