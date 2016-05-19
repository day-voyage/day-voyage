import React, { Component } from 'react';
import Maps from '../components/Maps';
import ConfirmContainer from '../containers/ConfirmContainer';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';


import { connect } from 'react-redux';

export class ConfirmView extends Component {

   constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: '',
      description: ''
    };
  }


  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(function() {
      that.setState({snackbar: false});
    }, 2000);
  }

  handleDesc(event){
    this.setState({
      description: event.target.value
    })
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Maps size="small" /> <br />
            Description: <br />
            <TextField
              onChange={this.handleDesc.bind(this)}
              multiLine={true}
              rows={4}
            /><br />
          </div>
          <div className="col-sm-6">
            <ConfirmContainer 
              openSnackbar={this.initiateSnackbar.bind(this)}
              planDesc={this.state.description}/>
            <Snackbar
              open={this.state.snackbar}
              message={this.state.message}
              autoHideDuration={2000} />
              

          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    planBuilder: state.planBuilder
  }
}

export default connect(
  mapStateToProps,
)(ConfirmView);
