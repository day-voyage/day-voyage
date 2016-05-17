import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToBuilder, 
        changingRoutes,
        saveActivityToDb } from '../actions';
import {GridList} from 'material-ui/GridList';
import { Card } from 'material-ui/Card';
import ActivityItem from '../components/ActivityItem';

var shortid = require('shortid');


class DBResultsContainer extends Component {
  render() {
    const { dbactivities, auth } = this.props;
    console.log('dbActivities in DBResultsContainer', dbactivities);
    const hasdbActivities = dbactivities.length > 0;
    if (hasdbActivities && dbactivities[0].distance) {
      dbactivities.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance));
    }
    return (
      <div>
        <h3 style={{marginLeft: 15}}>Activities</h3>
        <Card>
          {!hasdbActivities ? <em>0 search results</em> :
            dbactivities.map((activity, index) => {
              if (true) {
                return <ActivityItem
                  key={index}
                  activity={activity}
                  openSnackbar={this.props.openSnackbar}
                  onAddToBuilderClicked={() => {
                    this.props.addToBuilder(activity);
                    this.props.saveActivityToDb(Object.assign(activity, {
                      isYelp: true,
                      user_gen: false,
                      clientside_id: shortid.generate()
                    }), auth.token.access_token);
                  }}/>
              }
          })}
        </Card>
      </div>
    )
  }
}

DBResultsContainer.propTypes = {
  dbactivities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string
  })).isRequired,
  addToBuilder: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    dbactivities: state.dbactivities,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addToBuilder,
    saveActivityToDb }
)(DBResultsContainer)