import React from 'react';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from '../actions';
import LoginComponent from '../components/LoginComponent';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'redux-router';
import Snackbar from 'material-ui/Snackbar';

// import '../styles/core.scss';

@connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated,
   statusText: state.auth.statusText,
   signUpError: state.auth.signUpError,
  };
})

export default class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: 'false',
      snackbar: false,
      message: ''
    };
  }

  toggleModal () {
    this.setState({
      'modalOpen': !this.state.modalOpen
    });
  }

  initiateSnackbar(message) {
    this.setState({message: message, snackbar: true});
    var that = this;
    setTimeout(() => this.setState({snackbar: false}), 2000)
  }

  // shouldComponentUpdate() {
  //   console.log('component should update props');
  //   if (this.state.signUpError) {
  //     this.initiateSnackbar('Problem sign up');
  //   }
  // }

  render () {
    const {dispatch} = this.props;
    if (this.state.signUpError) {
      console.log('inside if')
      this.inititiateSnackbar('Problem signing you up');
    }
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Figs break no sweat</Link>
            </div>
            <div id="navbar">
              <div className="nav navbar-nav navbar-right">
                {this.props.isAuthenticated
                  ?
                    <span>
                      <FlatButton
                        label="Profile"
                        onClick={() => this.props.dispatch(push('/profile'))}
                      />
                      <FlatButton
                        label="Logout"
                        onClick={() => this.props.dispatch(logoutAndRedirect())}
                      />
                    </span>
                  :
                  <span>
                    <LoginComponent
                      modal={this.state.modalOpen}
                      toggleModal={this.toggleModal.bind(this)}
                    />
                  </span>
                  }
              </div>
            </div>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              {this.props.children}
            </div>
          </div>
          <Snackbar
            open={this.state.snackbar}
            message={this.state.statusText}
            autoHideDuration={2000} />
        </div>
      </div>
    );
  }
}
