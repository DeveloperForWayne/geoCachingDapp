import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 43.6761,
      lng: -79.4105
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key:""}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}>
        <AnyReactComponent
            lat={43.6761}
            lng={-79.4105}
            text="Your Cache"/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
