import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

export class ProfileView extends React.Component {

  render () {
    return (
        <div>
            {this.props.isFetching === true
                ? <h1>Loading data...</h1>
                : <div>
                    <h1>{this.props.auth.username}'s Profile</h1>
                    <h3>{this.props.data}</h3>
                </div>
            }
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);



    // componentWillMount () {
    //     this.fetchData();
    // }

    // fetchData () {
    //     let token = this.props.token;
    //     this.props.actions.fetchProtectedData(token);
    // }

