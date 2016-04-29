class Login extends React.Component {
  render() {
    return (
      <div className="col-sm-6">
        <form>
          Username:
          <input type="text" name="username"></input>
          Password:
          <input type="text" name="password"></input>
        </form>
      </div>
    );
  }
}

window.Login = Login;