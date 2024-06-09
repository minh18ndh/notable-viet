import './App.css';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css'; // Import CSS for marker clustering
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Import CSS for default marker clustering styles
import 'leaflet.markercluster'; // Import leaflet.markercluster library

const MapComponent = ({ viets, theme }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapInstance = L.map(mapRef.current).setView([0, 0], 2);
    mapInstance.getContainer().style.backgroundColor = theme === 'dark' ? '#262626FF' : '#FFFFFF'; // Change map container's background color based on theme

    // Select tile layer based on theme
    const tileLayerUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const tileLayerOptions = theme === 'dark'
      ? {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          minZoom: 2,
          maxZoom: 20
        }
      : {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          minZoom: 2,
          maxZoom: 20,
        };

    L.tileLayer(tileLayerUrl, tileLayerOptions).addTo(mapInstance);

    const markers = L.markerClusterGroup();

    viets.forEach(viet => {
      const [lat, lng] = viet.gps.split(',').map(coord => parseFloat(coord.trim()));

      // Create a custom icon with the person's name
      const customIcon = L.divIcon({
        className: theme === 'dark' ? 'custom-icon-dark' : 'custom-icon-light',
        html: viet.name
      });

      const popupContent = `
          <div>
              <h3>${viet.name}</h3>
              <p><strong>Born:</strong> ${viet.born}</p>
              ${viet.died.trim() ? `<p><strong>Died:</strong> ${viet.died}</p>` : ''}
              <p><strong>Occupation:</strong> ${viet.occupation}</p>
              <a href="${viet.wikipedia}" target="_blank">Wikipedia</a>
          </div>
      `;

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.bindPopup(popupContent);

      markers.addLayer(marker);
    });

    mapInstance.addLayer(markers);

    const southWest = L.latLng(-85, -360);
    const northEast = L.latLng(90, 360);
    const bounds = L.latLngBounds(southWest, northEast);
    mapInstance.setMaxBounds(bounds);
    mapInstance.on('drag', () => {
      mapInstance.panInsideBounds(bounds, { animate: false });
    });

    return () => {
      mapInstance.remove();
    };

  }, [viets, theme]);

  return <div ref={mapRef} style={{ 
                              width: '100%', 
                              height: '86.8vh', 
                            }} />;
};

export default MapComponent;
