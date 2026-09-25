"use client";

import dynamic from 'next/dynamic';

// Using the @ alias prevents folder navigation errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-slate-200 animate-pulse rounded-xl">Loading Map...</div>
});

export default function GeoSpatialLocator() {
  return (
    <main className="p-4 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Find a Channel Partner (Geo-Spatial Locator)</h1>
      <p className="text-gray-600 mb-6">Locate nearby State Agencies, Banks, and NBFCs.</p>
      <MapComponent /> 
    </main>
  );
}
