import * as React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import { getPlannerActivities } from '../../redux/reducers';
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
    if (this.props.size === "large") {
      const { activities } = this.props;

      var places = activities.map(function(item) {
        return {position: {location: {lat: parseFloat(item.lat), lng: parseFloat(item.long) }}, title: item.title, address: [item.address, item.city, item.state].join(', ') };
      });

      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: places[0].address,
          destination: places[places.length-1].address,
          waypoints: places.slice(1,-1).map((item) => item.position),
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
  }

  render() {
    var markers;
    
    if (this.props.size === "small") {
      const { activities } = this.props;

      markers = activities.map(function(item) {
        return {position: {lat: parseFloat(item.lat), lng: parseFloat(item.long) }, title: item.title };
      });
    } else {
      markers = [];
    }
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

const mapStateToProps = (state) => {
  return {
    activities: getPlannerActivities(state),
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