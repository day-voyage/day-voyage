import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlansByUser,
        getPlanWithActivities } from '../utils';
import DashboardPlanItem from '../components/DashboardPlanItem';
import { Card } from 'material-ui/Card';



export class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: []
    };
  }

  componentWillMount() {
    getPlansByUser(this.props.auth.user_id, response => {
      var results = [];
      for (var i = 0; i < response.data.length; i++) {
        getPlanWithActivities(response.data[i].id, plan => {
          console.log(plan);
          results.push(plan);
          this.setState({
            plans: results
          })
        });
      }
     
    });

  }

  render() {
    const { data, auth } = this.props;
    return (
      <div>
        <div>
          <h1>{auth.username}'s Profile</h1>
          <h3>Itineraries</h3>
          <Card>
          <button onClick={() => this.getPlans(auth.user_id)}>Get Plans</button>
          {this.state.plans.map((item, index) => {
            return <DashboardPlanItem
              key={index}
              plan={item.plan}
              activities={item.activities} />
          })}
          </Card>
        </div>
      </div>
    );
  }
}

/*
{this.props.isFetching === true
    ? <h1>Loading data...</h1>
*/

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching,
  auth: state.auth,
});

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actionCreators, dispatch),
// });

export default connect(
  mapStateToProps
  )(DashboardView);

