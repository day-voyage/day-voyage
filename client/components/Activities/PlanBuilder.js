var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;
// var redux = require('react-redux');
// var actions = require('../../redux/actions/actions.js');

class PlanBuilder extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        PlanBuilder is here
      </div>
    );
  }
};

PlanBuilder.propTypes = {

};

// export default redux.connect(

// )(PlanBuilder);

window.PlanBuilder = PlanBuilder;