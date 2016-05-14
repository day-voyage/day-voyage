import React, { Component, PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class DBActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false
    };
  }

  clickAddButton() {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    });
    this.props.onAddToBuilderClicked();
    this.props.openSnackbar("Event has been added to your itinerary");
  }

  render() {
    const { activity } = this.props;
    var title = activity.distance ? activity.title + ' - ' + activity.distance + " away" : activity.title;
    return (
      <GridTile
        title={title}
        subtitle={<span><b>{activity.neighborhood ? activity.neighborhood : ''}</b></span>}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        onClick={this.clickAddButton.bind(this)} >
        <img src="http://www.organicfacts.net/wp-content/uploads/2013/05/Fig2.jpg" />
      </GridTile>
    )
  }
}

DBActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  onAddToBuilderClicked: PropTypes.func.isRequired
}
