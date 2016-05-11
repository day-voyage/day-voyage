import React, { Component } from 'react';
import {Link} from 'react-router';
import Maps from '../components/Maps';
import ConfirmContainer from '../containers/ConfirmContainer';
import Snackbar from 'material-ui/Snackbar';


import { connect } from 'react-redux';

export class ConfirmView extends Component {

   constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: '',
    };
  }

  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(function() {
      that.setState({snackbar: false});
    }, 2000);
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Maps size="small" />
          </div>
          <div className="col-sm-6">
            <ConfirmContainer openSnackbar={this.initiateSnackbar.bind(this)}/>
            <Snackbar
              open={this.state.snackbar}
              message={this.state.message}
              autoHideDuration={2000} />
              
              <div class="addthis_sharing_toolbox"></div>
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
