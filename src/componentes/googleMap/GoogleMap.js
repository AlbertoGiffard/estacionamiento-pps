import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import './GoogleMap.css';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const GoogleMap = ({ puntos }) => {
  const [mapContainer, setMapContainer] = useState(null);
  const [puntosState, setPuntosState] = useState([]);
  const onLoad = useCallback((map) => addMarkers(map), []);

  const mapOptions = {
    zoom: 14,
    center: {
      lat: -34.6037,
      lng: -58.3816,
    }
  }

  useEffect(() => {
    if (puntos && puntos.length > 0) {
      setPuntosState(puntos);
    }
    console.log('2', puntos);
  }, []);

  const addMarkers = (map) => {
    const infoWindow = new window.google.maps.InfoWindow();
  
    const markers = puntosState.map(([lat, lng]) => {
      const marker = new window.google.maps.Marker({ position: { lat, lng } });
  
      marker.addListener("click", () => {
        infoWindow.setPosition({ lat, lng });
        infoWindow.setContent(`
          <div class="info-window">
            <h2>Estacionamiento</h2>
          </div>
        `);
        infoWindow.open({ map });
      });
  
      return marker;
    });
  
    new MarkerClusterer({
      markers,
      map
    });
  }


  return (
    <GoogleMapsProvider
      googleMapsAPIKey='AIzaSyC-nBlHCf6Ul8vQf5vWJJMglKkKew7S82Y'
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoadMap={onLoad}
    >
      <div
        ref={(node) => setMapContainer(node)}
        className='h-view'
      />
    </GoogleMapsProvider>
  );
};

export default GoogleMap;

