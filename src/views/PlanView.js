import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

export const PlanView = ( { params } ) => (
  <h3>Show Plan ID:{ params.id }!</h3>
);

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanView);