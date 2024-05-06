import './App.css';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css'; // Import CSS for marker clustering
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // Import CSS for default marker clustering styles
import 'leaflet.markercluster'; // Import leaflet.markercluster library

const MapComponent = ({ viets }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapInstance = L.map(mapRef.current).setView([0, 0], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 20
    }).addTo(mapInstance);

    // L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    //   attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //   minZoom: 2,
    //   maxZoom: 22,
    //   accessToken: 'q5a06xoWrGUfe2xPIRM4c2ABgukcijYnIs3ntFWspBBFXXDLO4Vxv0QINw0I8X1k'
    // }).addTo(mapInstance);

    // Initialize marker cluster group
    const markers = L.markerClusterGroup();

    viets.forEach(viet => {
      const [lat, lng] = viet.gps.split(',').map(coord => parseFloat(coord.trim()));

      // Create a custom icon with the person's name
      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: viet.name
      });

      // Create HTML content for the popup with person's information
      const popupContent = `
          <div>
              <h3>${viet.name}</h3>
              <p><strong>Born:</strong> ${viet.born}</p>
              ${viet.died.trim() ? `<p><strong>Died:</strong> ${viet.died}</p>` : ''}
              <p><strong>Occupation:</strong> ${viet.occupation}</p>
              <a href="${viet.wikipedia}" target="_blank">Wikipedia</a>
          </div>
      `;

      // Create marker with custom icon
      const marker = L.marker([lat, lng], { icon: customIcon });

      // Bind popup content to marker
      marker.bindPopup(popupContent);

      // Add marker to marker cluster group
      markers.addLayer(marker);
    });

    // Add marker cluster group to map
    mapInstance.addLayer(markers);

    // Define boundaries for the map to restrict dragging
    const southWest = L.latLng(-85, -360);
    const northEast = L.latLng(90, 360);
    const bounds = L.latLngBounds(southWest, northEast);
    mapInstance.setMaxBounds(bounds); // Restrict map dragging within bounds
    mapInstance.on('drag', () => {
      mapInstance.panInsideBounds(bounds, { animate: false });
    });

    return () => {
      mapInstance.remove();
    };

  }, [viets]);

  return <div ref={mapRef} style={{ 
                              width: '100%', 
                              height: '86.8vh', 
                            }} />;
};

export default MapComponent;
