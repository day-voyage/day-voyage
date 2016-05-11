import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { addToBuilder, 
        deleteFromBuilder, 
        reorderUp, 
        reorderDown, 
        changingRoutes,
        saveToDb} from '../actions';
import { bindActionCreators } from 'redux';
import ConfirmItem from '../components/ConfirmItem'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itinTitle: ''
    };
  }

  handleTitle(event) {
    this.setState({itinTitle: event.target.value});
  }

  render() {
    const { planBuilder } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
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
          onClick={() => this.props.saveToDb(planBuilder, this.state.itinTitle)}>
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
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder, 
    deleteFromBuilder, 
    reorderUp, 
    reorderDown, 
    changingRoutes,
    saveToDb }
)(ConfirmContainer)