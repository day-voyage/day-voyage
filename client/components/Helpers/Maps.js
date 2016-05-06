import * as React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import { getConfirmActivities } from '../../redux/reducers';
import { directions } from '../../redux/reducers/map.js';

import { changingRoutes } from '../../redux/actions';
import { connect } from 'react-redux';


export default class Maps extends React.Component {

  componentDidMount() {
    const { activities } = this.props;

    changingRoutes(activities);
  }

  updateRoute() {
  }

  render() {
    const { directions } = this.props;

    var markers = [{position: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.long) }, title: this.props.title }];

    var centerLat = 37.7749;
    var centerLng = -122.4194;
    if (this.props.lat && this.props.long) {
      centerLat = parseFloat(this.props.lat);
      centerLng = parseFloat(this.props.long);
    }

    return (
      <div className={styles[this.props.size].divClass}>
        <section style={styles[this.props.size].mapSize}>
          <button onClick={this.updateRoute.bind(this)}>CLICK HERE</button>
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={styles[this.props.size].mapPosition}
              />
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: centerLat, lng: centerLng}}>
                  {markers.map((marker, index) => {
                    return (
                      <Marker
                        key={ index }
                        title={ marker.title }
                        {...marker} />
                    );
                  })}
                  { directions ? <DirectionsRenderer directions={directions} /> : null}
              </GoogleMap>
            }
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.confirmation,
    directions: directions(state.directions, {type: "RECEIVE_ROUTES"})
  }
}

var styles = {
  large: {
    mapSize: {
      height: "500px",
      width: "500px"
    },
    mapPosition: {
      height: "100%",
      width: "100%",
      position: "absolute"
    },
    divClass: "col-md-8"
  },
  small: {
    mapSize: {
      height: "400px",
      width: "400px"
    },
    mapPosition: {
      height: "100%",
      width: "100%"
      // position: "absolute"
    },
    divClass: "col-md-4"
  }
}

export default connect(
  mapStateToProps,
  { changingRoutes }
)(Maps)