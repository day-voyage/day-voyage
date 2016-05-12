import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavContainer from './NavContainer';
import Snackbar from 'material-ui/Snackbar';


export default class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      message: ''
    };
  }

  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(() => this.setState({snackbar: false}), 2000)
  }

  render () {
    const {dispatch} = this.props;
    return (
      <div>
        <NavContainer 
          openSnackbar={this.initiateSnackbar.bind(this)}/>
        <Snackbar
          open={this.state.snackbar}
          message={this.state.message}
          autoHideDuration={2000} />
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
