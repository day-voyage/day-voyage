import React, { Component } from 'react';
import {connect} from 'react-redux';
import { deleteFromDashboard } from '../actions'
import DashboardPlanItem from '../components/DashboardPlanItem';
import { Card } from 'material-ui/Card';



export class DashboardView extends Component {

  render() {
    const { data, auth, dashboard } = this.props;
    return (
      <div>
        <div>
          <h1>Welcome, {auth.username}</h1>
          <h3>Itineraries</h3>
          {dashboard.length > 0 ? '' : 'You don\'t have any itineraries, create one now!'}
          <Card>
          {dashboard.map((item, index) => {
            return <DashboardPlanItem
              key={index}
              title={item.title}
              desc={item.desc}
              plan_id={item.id}
              onDeleteClicked={() => {
                this.props.deleteFromDashboard(index);
              }}
              activities={item.activities} />
          })}
          </Card>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching,
  auth: state.auth,
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { deleteFromDashboard }
  )(DashboardView);

