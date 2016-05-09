import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { changingRoutes } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';


export default class Maps extends Component {

  componentDidMount() {
    const { planBuilder } = this.props;
    if (planBuilder.length > 0) {
      changingRoutes(planBuilder);
    }
  }

  render() {
    const { directions, activities } = this.props;
    var markers = activities.map(function(item) {
      return {position: {lat: parseFloat(item.lat), lng: parseFloat(item.long) }, title: item.title };
    });
    // var markers = [{position: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.long) }, title: this.props.title }];

    var centerLat = 37.7749;
    var centerLng = -122.4194;
    
    if (this.props.lat && this.props.long) {
      centerLat = parseFloat(this.props.lat);
      centerLng = parseFloat(this.props.long);
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
                defaultCenter={{lat: centerLat, lng: centerLng}}>
                  {markers.map((marker, index) => {
                    return (
                      <Marker
                        key={ index }
                        title={ marker.title }
                        {...marker} />
                    );
                  })}
                  { directions && !this.props.lat ? <DirectionsRenderer directions={directions} /> : null}
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
    planBuilder: state.planBuilder,
    directions: state.directions,
    activities: state.activities
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
      width: "550px"
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