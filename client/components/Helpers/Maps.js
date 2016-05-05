import * as React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import { getVisibleActivities } from '../../redux/reducers/activities.js';
import { connect } from 'react-redux';


export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      somePlace: {location: {lat: 37.72, lng: -122.33}}
    };
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: '2434 Geary Blvd, San Francisco, CA',
        destination: "944 Market Street, San Francisco, CA",
        waypoints: [this.state.somePlace, {location: {lat: 37.73, lng: -122.37}}],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${ result }`);
        }
    });
  }

  render() {
    const { activities } = this.props;
    var markers = activities.map(function(item) {
      return {position: {lat: item.lat, lng: item.long }, title: item.title };
    });

    return (
      <div className={styles[this.props.size].divClass}>
        <section style={styles[this.props.size].mapSize}>
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
                defaultCenter={{lat: 37.73, lng: -122.37}}>
                  {markers.map((marker, index) => {
                    return (
                      <Marker
                        key={ index }
                        {...marker} />
                    );
                  })}
                  {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}
              </GoogleMap>
            }
          />
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: getVisibleActivities(state.activities)
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
      height: "250px",
      width: "250px"
    },
    mapPosition: {
      height: "100%",
      width: "100%",
      position: "absolute"
    },
    divClass: "col-md-4"
  }
}

export default connect(
  mapStateToProps
)(Maps)