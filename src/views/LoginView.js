import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import React, { PropTypes, Component} from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/';
    this.state = {
      username: '',
      password: '',
      redirectTo: redirectRoute
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  login(e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
        <form>
          <div>
            <input type='text'
              onChange={this.handleUsernameChange.bind(this)}
              placeholder='username' />
            <br />
            <input type='password'
              onChange={this.handlePasswordChange.bind(this)}
              placeholder='password' />
            <br />
            <button type='submit'
              disabled={this.props.isAuthenticating}
              onClick={this.login.bind(this)}>Submit</button>
          </div>
      </form>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
