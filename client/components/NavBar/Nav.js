class Nav extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Title />
          <Login />
        </div>
      </div>

    );
  }
}

window.Nav = Nav;