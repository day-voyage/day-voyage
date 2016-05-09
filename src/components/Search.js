// import { browserHistory } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { getAllActivities } from '../actions';
import { Provider } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import {orange500, blue500} from 'material-ui/styles/colors';

export class Search extends React.Component {
  // static contextTypes = {
  //   router: React.PropTypes.object
  // }

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      city: "San Francisco, CA"
    }
  }

  searchActivities(event) {
    event.preventDefault();
    // console.log(this.context.router);
    // TODO: refactor below
    this.props.actions.getAllActivities({city: this.state.city, category: this.state.category});
  }

  handleCategory(event) {
    this.setState({category: event.target.value});
  }

  handleCity(event, index, value){
    this.setState({city: value});
  }

  render() {
    return (
      <div className="col-sm-12">
        <form style={{textAlign: "center", marginTop: 25}} className="commentForm" onSubmit={this.searchActivities.bind(this)}>
          <h5>Search Category: </h5>
          <TextField
            id="text-field-controlled"
            type="text"
            value={this.state.value}
            placeholder="Category"
            style={{marginBottom: 25}}
            onChange={this.handleCategory.bind(this)} />
          <h5>Select City: </h5>
          <SelectField value={this.state.city} onChange={this.handleCity.bind(this)}>
            <MenuItem value="San Francisco, CA" primaryText="San Francisco, CA" />
            <MenuItem value="Oakland, CA" primaryText="Oakland, CA" />
            <MenuItem value="San Jose, CA" primaryText="San Jose, CA" />
          </SelectField><br />
          <FlatButton label="Search" type="submit"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
