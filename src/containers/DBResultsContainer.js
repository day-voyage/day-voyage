import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, changingRoutes } from '../actions';
import {GridList} from 'material-ui/GridList';
import { Card } from 'material-ui/Card';
import DBActivityItem from '../components/DBActivityItem';



class DBResultsContainer extends Component {
  render() {
    const { activities } = this.props;
    const hasActivities = activities.length > 0;
    return (
      <Card>
        <GridList
          cellHeight={200}
          style={styles.gridList}>
          {!hasActivities ? <em>0 search results</em> :
            activities.map((activity, index) =>
              <DBActivityItem
                key={index}
                activity={activity}
                openSnackbar={this.props.openSnackbar}
                onAddToBuilderClicked={() => {
                  this.props.addToBuilder(activity) }}/>
          )}
        </GridList>
      </Card>
    )
  }
}

DBResultsContainer.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder }
)(DBResultsContainer)

const styles = {
  gridList: {
    width: 550,
    height: 500,
    marginBottom: 24,
  },
};