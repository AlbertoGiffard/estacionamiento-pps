import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class GoogleMap extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
      borderRadius: '5px'
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: -34.6037, lng: -58.3816 }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC-nBlHCf6Ul8vQf5vWJJMglKkKew7S82Y'
})(GoogleMap);
