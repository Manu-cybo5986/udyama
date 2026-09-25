'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  useEffect(() => { setIsMounted(true); }, []);

  // Strict NPA suppression + category/region filtering
  const validPartners = partnerData.features.filter(partner => {
    const p = partner.properties;
    if (p.hasHighNPA) return false; // Strict suppression rule

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesRegion   = regionFilter   === 'All' || p.region   === regionFilter;

    return matchesCategory && matchesRegion;
  });

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
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="Jaipur Central">Jaipur Central</option>
          <option value="Jaipur South">Jaipur South</option>
          <option value="Jaipur West">Jaipur West</option>
        </select>
      </div>

      {/* Responsive Map Container */}
      <div style={{
        height: '480px',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #cbd5e1',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 0,
      }}>
        <MapContainer
          center={[26.9124, 75.7873]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          {validPartners.map((partner, index) => {
            // GeoJSON stores [longitude, latitude] — swap for Leaflet's [lat, lng]
            const [lng, lat] = partner.geometry.coordinates;
            const { name, category, region } = partner.properties;

            return (
              <Marker
                key={index}
                position={[lat, lng]}
                icon={icons[category] || icons.RRB}
              >
                <Popup>
                  <div className="font-sans">
                    <strong className="text-base block mb-1">{name}</strong>
                    <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 mb-1">
                      {category}
                    </span>
                    <p className="m-0 text-sm text-slate-600">📍 {region}</p>
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
