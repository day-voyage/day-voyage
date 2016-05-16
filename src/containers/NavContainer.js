import React from 'react';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from '../actions';
import LoginComponent from '../components/LoginComponent';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'redux-router';

@connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated,
  };
})

export default class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: 'false'
    };
  }

  toggleModal () {
    this.setState({
      'modalOpen': !this.state.modalOpen
    });
  }

  render () {
    const {dispatch} = this.props;
    return (
      <nav className="app-navbar">
        <div className="app-navbar__header">
            <Link className="app-title" to="/">GoodTimes</Link>
        </div>
        <div className="app-navbar__actions">
          {this.props.isAuthenticated
            ?
              <span>
                <FlatButton
                  label="Activities"
                  onClick={() => this.props.dispatch(push('/activities'))}
                />
                <FlatButton
                  label="Dashboard"
                  onClick={() => this.props.dispatch(push('/dashboard'))}
                />
                <FlatButton
                  label="Logout"
                  secondary="true"
                  onClick={() => this.props.dispatch(logoutAndRedirect(this.props.openSnackbar))}
                />
              </span>
            :
              <span>
                <LoginComponent
                  modal={this.state.modalOpen}
                  toggleModal={this.toggleModal.bind(this)}
                  openSnackbar={this.props.openSnackbar}
                />
              </span>
          }
        </div>
      </nav>
    );
  }
}
