import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlansByUser,
        getActivitiesByPlan } from '../actions';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: ''
    };
  }

  render() {
    const { data, auth } = this.props;
    this.props.getPlansByUser(auth.user_id, response => console.log(response));
    // var exampleAct = this.props.getActivitiesByPlan() 
    return (
        <div>
            {this.props.isFetching === true
                ? <h1>Loading data...</h1>
                : <div>
                    <h1>{auth.username}'s Profile</h1>
                    <h3>Itineraries</h3>
                </div>
            }
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching,
  auth: state.auth,
});

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actionCreators, dispatch),
// });

export default connect(
  mapStateToProps, 
  { getPlansByUser,
  getActivitiesByPlan }
  )(ProfileView);

