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

// Component to handle map center/zoom updates
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [mapCenter, setMapCenter] = useState([22.9074, 79.0730]); // Center of India
  const [mapZoom, setMapZoom] = useState(5); // National zoom level

  useEffect(() => { setIsMounted(true); }, []);

  // Extract unique regions for the dropdown
  const uniqueRegions = useMemo(() => {
    const regions = new Set();
    partnerData.features.forEach(partner => {
      if (!partner.properties.hasHighNPA) {
        regions.add(partner.properties.region);
      }
    });
    return Array.from(regions).sort();
  }, []);

  // Strict NPA suppression + category/region filtering
  const validPartners = partnerData.features.filter(partner => {
    const p = partner.properties;
    if (p.hasHighNPA) return false; // Strict suppression rule

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesRegion   = regionFilter   === 'All' || p.region   === regionFilter;

    return matchesCategory && matchesRegion;
  });

  // Handle region change to update map center
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegionFilter(selectedRegion);
    
    if (selectedRegion === 'All') {
      setMapCenter([22.9074, 79.0730]); // India center
      setMapZoom(5);
    } else {
      // Find a partner in the selected region to center the map on
      const partnerInRegion = validPartners.find(p => p.properties.region === selectedRegion);
      if (partnerInRegion) {
        const [lng, lat] = partnerInRegion.geometry.coordinates;
        setMapCenter([lat, lng]);
        setMapZoom(9); // Closer zoom for specific region
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Interactive Map Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', zIndex: 10 }}>
        <select
          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', fontSize: '14px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="SCA">State Agencies (SCA)</option>
          <option value="RRB">Rural Banks (RRB)</option>
          <option value="NBFC">Micro-Finance (NBFC)</option>
          <option value="Bank">Banks</option>
        </select>

        <select
          style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#fff', fontSize: '14px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          value={regionFilter}
          onChange={handleRegionChange}
        >
          <option value="All">All Regions (India)</option>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        
        <button 
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setMapCenter([position.coords.latitude, position.coords.longitude]);
                  setMapZoom(11);
                  setRegionFilter('All');
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
          style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: '#3b82f6', color: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: '500', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          📍 Locate Me
        </button>
      </div>

      {/* Responsive Map Container */}
      <div style={{
        height: '550px',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #cbd5e1',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 0,
      }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <MapUpdater center={mapCenter} zoom={mapZoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          {validPartners.map((partner, index) => {
            // GeoJSON stores [longitude, latitude] — swap for Leaflet's [lat, lng]
            const [lng, lat] = partner.geometry.coordinates;
            const { name, category, region, loanTypes, contact } = partner.properties;

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
                    <p className="m-0 text-sm text-slate-600 mb-1">📍 <strong>Region:</strong> {region}</p>
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

