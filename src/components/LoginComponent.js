import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log('>>>>> props in loginModal:', this.props);
    this.state = {
      username: '',
      password: '',
      redirectTo: redirectRoute,
      open: false
    };
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    const redirectRoute = this.props.location.query.next || '/';
    this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
    this.setState({open: false});
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // login(e) {
  //   e.preventDefault();
  //   this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
  // }

  render() {
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={true}
            onTouchTap={this.handleClose}
          />,
        ];

    return (
      <div>
        {this.props.statusText ? <div>{this.props.statusText}</div> : ''}

        <div>
            <RaisedButton label="Login" onTouchTap={this.handleOpen} />
            <Dialog
              title="Come in"
              actions={actions}
              modal={true}
              open={this.state.open}
            >
            <form>
              <input type='text'
                onChange={this.handleUsernameChange.bind(this)}
                placeholder='username' />
              <br />
              <input type='password'
                onChange={this.handlePasswordChange.bind(this)}
                placeholder='password' />
              <br />
            </form>
            </Dialog>
        </div>
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
)(LoginModal);
