import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes,
        editDescription,
        savePlanToDb } from '../actions';
import { bindActionCreators } from 'redux';
import ConfirmItem from '../components/ConfirmItem'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var shortid = require('shortid');

export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planTitle: ''
    };
  }

  handleTitle(event) {
    this.setState({planTitle: event.target.value});
  }

  // handleSubmit() {
  //   var plan = {
      
  //   }
  // }

  render() {
    const { planBuilder, auth } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // [{"name":"user_id","type":"int"},
    // {"name":"clientside_id", "type":"string"},
    // {"name":"title","type":"string"},
    // {"name":"desc","type":"string"},
    // {"name":"likes","type":"int"}])
    
    return (
      <Card>
      <TextField
        hintText="Name Your Itinerary"
        onChange={this.handleTitle.bind(this)}
      /><br />
        <div>
        {planBuilder.map((activity, index) => 
          <ConfirmItem
            key={index}
            activity={activity}
            order={alphabetOrder[index] + '.'}
            openSnackbar={this.props.openSnackbar}
            editDescChange={(text) => this.props.editDescription(index, text)}
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(planBuilder.indexOf(activity));
              
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));
              }}/>
        )}
        </div>
        <FlatButton
          onClick={() => this.props.savePlanToDb(Object.assign({}, {
            user_id: auth.token.user_id,
            clientside_id: shortid.generate(),
            title: this.state.plantitle,
            desc: '',
            likes: 0
          }), auth.token.access_token)}>
          Save Itinerary
        </FlatButton>
      </Card>
    )
  }

}

// ConfirmContainer.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     // categories: PropTypes.array.isRequired,
//     city: PropTypes.string.isRequired
//   })).isRequired,
//   saveToDb: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
  return {
    planBuilder: state.planBuilder,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder, 
    deleteFromBuilder, 
    reorderUp, 
    reorderDown, 
    changingRoutes,
    editDescription,
    savePlanToDb,
    editDescription }
)(ConfirmContainer)