import * as React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";


export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      origin: '2434 Geary Blvd, San Francisco, CA',
      destination: "944 Market Street, San Francisco, CA",
    };
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        waypoints: [{location: {lat: 37.73, lng: -122.37}}, {location: {lat: 37.72, lng: -122.33}}],
        optimizeWaypoints: true,
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

    var destObj = {
      lat: 37.7749,
      lng: -122.4194
    };
    var markers = [
      {position: destObj, title: 'Hello World!'},
      {position: {lat: 37.75, lng: -122.4}, title: 'second one'}
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>HERE IS YOUR MAP</h1>
            <section style={{height: "500px"}}>
              <GoogleMapLoader
                containerElement={
                  <div
                    {...this.props}
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute"
                    }}
                  />
                }
                googleMapElement={
                  <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{lat: destObj.lat, lng: destObj.lng}}>
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
        </div>
      </div>
    );
  }
}
