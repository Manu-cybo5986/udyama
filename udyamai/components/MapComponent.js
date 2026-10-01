'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import partnerData from '@/data/partners.json';

// Define custom map markers
const createIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const icons = {
  SCA:  createIcon('green'),
  RRB:  createIcon('blue'),
  NBFC: createIcon('orange'),
  Bank: createIcon('red'),
};

// Component to handle map center/zoom updates smoothly (Auto-Pan)
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5, // Smooth animation
    });
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Center of India
  const [mapZoom, setMapZoom] = useState(5); // National zoom level

  useEffect(() => { setIsMounted(true); }, []);

  // Extract unique states for the dropdown
  const uniqueStates = useMemo(() => {
    const states = new Set();
    partnerData.features.forEach(partner => {
      if (!partner.properties.hasHighNPA) {
        states.add(partner.properties.state);
      }
    });
    return Array.from(states).sort();
  }, []);

  // Strict NPA suppression + category/state filtering
  const validPartners = partnerData.features.filter(partner => {
    const p = partner.properties;
    if (p.hasHighNPA) return false; // Strict suppression rule

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesState    = stateFilter === 'All'    || p.state === stateFilter;

    return matchesCategory && matchesState;
  });

  // Handle state change to smoothly update map center
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setStateFilter(selectedState);
    
    if (selectedState === 'All') {
      setMapCenter([20.5937, 78.9629]); // India center
      setMapZoom(5);
    } else {
      // Find a partner in the selected state to center the map on
      const partnerInState = validPartners.find(p => p.properties.state === selectedState);
      if (partnerInState) {
        const [lng, lat] = partnerInState.geometry.coordinates;
        setMapCenter([lat, lng]);
        setMapZoom(8); // Closer zoom for specific state
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Interactive Map Controls */}
      <div className="flex flex-wrap gap-3 z-10">
        <select
          className="px-3 py-2 border border-slate-300 rounded-md bg-white text-sm shadow-sm cursor-pointer"
          value={stateFilter}
          onChange={handleStateChange}
        >
          <option value="All">All States</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        
        <select
          className="px-3 py-2 border border-slate-300 rounded-md bg-white text-sm shadow-sm cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="SCA">State Agencies (SCA)</option>
          <option value="RRB">Rural Banks (RRB)</option>
          <option value="NBFC">Micro-Finance (NBFC)</option>
          <option value="Bank">Banks</option>
        </select>

        <button 
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setMapCenter([position.coords.latitude, position.coords.longitude]);
                  setMapZoom(11);
                  setStateFilter('All');
                },
                (error) => {
                  console.error("Error getting location: ", error);
                  alert("Could not get your location. Please check browser permissions.");
                }
              );
            } else {
              alert("Geolocation is not supported by this browser.");
            }
          }}
          className="px-4 py-2 border-none rounded-md bg-blue-500 text-white text-sm font-medium cursor-pointer shadow-sm hover:bg-blue-600 transition-colors"
        >
          📍 Locate Me
        </button>
      </div>

      {/* Responsive Map Container */}
      <div className="h-[55vh] min-h-[450px] w-full rounded-xl overflow-hidden border border-slate-300 shadow-inner relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="h-full w-full"
        >
          <MapUpdater center={mapCenter} zoom={mapZoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          {validPartners.map((partner, index) => {
            // GeoJSON stores [longitude, latitude] — swap for Leaflet's [lat, lng]
            const [lng, lat] = partner.geometry.coordinates;
            const { name, category, state, loanTypes, contact } = partner.properties;

            return (
              <Marker
                key={index}
                position={[lat, lng]}
                icon={icons[category] || icons.RRB}
              >
                <Popup>
                  <div className="font-sans min-w-[200px]">
                    <strong className="text-base block mb-1">{name}</strong>
                    <div className="flex gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium border border-slate-200">
                        {category}
                      </span>
                    </div>
                    <p className="m-0 text-sm text-slate-600 mb-1">📍 <strong>State:</strong> {state}</p>
                    {contact && <p className="m-0 text-sm text-slate-600 mb-1">📞 <strong>Contact:</strong> {contact}</p>}
                    {loanTypes && (
                      <div className="mt-2">
                        <strong className="text-xs text-slate-500 uppercase tracking-wider">Available Loans</strong>
                        <ul className="m-0 mt-1 pl-4 text-xs text-slate-700 list-disc">
                          {loanTypes.map((type, i) => (
                            <li key={i}>{type}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

