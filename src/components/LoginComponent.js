import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    // console.log('>>>>>  prop in login modal:', props);
    const { router } = props;
    const redirectRoute = router.location.query.next || router.location.pathName;
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

  handleCancel() {
    this.setState({open: false});
  }

  handleSubmit () {
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
    console.log('props in render>>>>>>>',this.props);
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleCancel.bind(this)}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            // disabled={true}
            onClick={this.handleSubmit.bind(this)}
          />,
        ];

    return (
      <div>
        <div>
          <FlatButton label="Login" onClick={this.handleOpen.bind(this)} />
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
  statusText: state.auth.statusText,
  router: state.router

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
