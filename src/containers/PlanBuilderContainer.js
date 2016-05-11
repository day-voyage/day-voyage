import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmPlan,
        addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes } from '../actions';
import { buildPlanner } from '../reducers';
import PlanBuilderItem from '../components/PlanBuilderItem';
import CreateActivity from '../components/CreateActivity';
import Maps from '../components/Maps';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class PlanBuilderContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  goToConfirm() {
    this.context.router.push('/confirmation');
  }

  render() {
    const { planBuilder, activities } = this.props;
    const hasActivities = planBuilder.length > 0;
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {planBuilder.map((activity, index) => 
          <PlanBuilderItem
            key={index}
            activity={activity}
            openSnackbar={this.props.openSnackbar}
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(planBuilder.indexOf(activity));
              changingRoutes(planBuilder);
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));
              changingRoutes(planBuilder);
            }}/>
        )}
        </div>
      </div>
    return (
      <div>
        <div className="row" style={{marginBottom: 10}}>>
          <Maps 
            size="small" />
        </div>
        <Card>
          <h3 style={{marginLeft: 15}}>Itinerary</h3>
          <CreateActivity 
            modal={this.state.modalOpen}
            toggleModal={this.toggleModal.bind(this)}
            openSnackbar={this.props.openSnackbar}
            addFromCreate={(created) => this.props.addToBuilder(created)}/>
          <FlatButton 
            label="Create Own Activity"
            onClick={this.toggleModal.bind(this)} /><br />
          {nodes}
          <div style={{marginBottom: 10}}>
            <FlatButton
              label="Confirm"
              onClick={() => this.goToConfirm()}
              style={{position: "relative", float: "right"}}
              disabled={hasActivities ? false : true} />
          </div>
        </Card>
      </div>
    )
  }
} 

PlanBuilderContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  })).isRequired,
  confirmPlan: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
    activities: state.activities
  }
}

export default connect(
  mapStateToProps,
  { confirmPlan, 
    addToBuilder,
    deleteFromBuilder, 
    reorderUp, 
    reorderDown, 
    changingRoutes }
)(PlanBuilderContainer)