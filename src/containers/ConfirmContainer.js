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

export class ConfirmContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      abcExample: ''
    };
  }

  render() {
    const { planBuilder } = this.props;
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    return (
      <div>
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
              changingRoutes(planBuilder);
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(planBuilder.indexOf(activity));
              changingRoutes(planBuilder)}}/>
        )}
        </div>
        <button
          onClick={() => this.props.saveToDb(activities)}>
          Save Itinerary
        </button>
      </div>
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