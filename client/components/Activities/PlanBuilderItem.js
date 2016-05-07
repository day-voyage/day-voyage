import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class PlanBuilderItem extends Component {
  render() {
    const { activity } = this.props

    return (
      <div
        style={{ marginBottom: 20,
                borderStyle: "solid",
                borderWidth: "2px" }}>
        <div> {activity.title} - {activity.desc} {activity.location } </div>
        <FlatButton
          label="Up"
          onClick={this.props.onMoveUpClicked} />
        <FlatButton
          label="Down"
          onClick={this.props.onMoveDownClicked} />
        <FlatButton
          label="Delete"
          onClick={this.props.onDeleteFromBuilderClicked} />
      </div>
    )
  }
}

PlanBuilderItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  }).isRequired,
  onDeleteFromBuilderClicked: PropTypes.func.isRequired
}
