var ReactRouter = window.ReactRouter;
let Link = ReactRouter.Link;

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