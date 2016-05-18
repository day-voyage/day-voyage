import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPlanToBuilder, 
        changingRoutes,
        saveActivityToDb,
        addToBuilder } from '../actions';
import { Card, CardText } from 'material-ui/Card';
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
        <Card style={cardColumnStyle}>
          {!hasplans ? 
            <CardText>
              <em>0 search results</em> 
            </CardText> :
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

var cardColumnStyle = {
 paddingTop: 15,
 paddingBottom: 15,
 paddingLeft: 15,
 paddingRight: 15
};

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