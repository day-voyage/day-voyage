import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPlanToBuilder, 
        changingRoutes,
        saveActivityToDb,
        addToBuilder } from '../actions';
import { Card } from 'material-ui/Card';
import DBPlan from '../components/DBPlan';

var shortid = require('shortid');


class DBPlansContainer extends Component {
  render() {
    const { plans, auth } = this.props;
    const hasplans = plans.length > 0;
    if (hasplans && plans[0].distance) {
      plans.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance));
    }
    return (
      <div>
        <h3 style={{marginLeft: 15}}>Plans</h3>
        <Card>
          {!hasplans ? <em>0 search results</em> :
            plans.map((plan, index) => {
              return <DBPlan
                key={index}
                plan={plan}
                openSnackbar={this.props.openSnackbar}
                onAddToBuilderClicked={() => {
                  plan.activities.forEach(activity => {
                    this.props.addToBuilder(activity);
                  })
                }}/>
          })}
        </Card>
      </div>
    )
  }
}

// DBPlansContainer.propTypes = {
//   plans: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     city: PropTypes.string
//   })).isRequired,
//   addToBuilder: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
  return {
    plans: state.plans,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addPlanToBuilder,
    addToBuilder }
)(DBPlansContainer)