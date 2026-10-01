"use client";

import dynamic from 'next/dynamic';
import Recommender from '@/components/Recommender';
import EMICalculator from '@/components/EMICalculator';

// Using the @ alias prevents folder navigation errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[550px] w-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center text-slate-500 font-medium">Loading Map...</div>
});

export default function GeoSpatialLocator() {
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">MoSJE Financial Assistance Dashboard</h1>
        <p className="text-slate-600">
          Empowering marginalized citizens with accessible concessional financial assistance.
        </p>
      </header>

      {/* Top Section: Recommender and EMI Calculator Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="h-full">
          <Recommender />
        </section>
        
        <section className="h-full">
          <EMICalculator />
        </section>
      </div>

      {/* Bottom Section: Geo-Spatial Partner Locator */}
      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6 w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Geo-Spatial Partner Locator</h2>
        <p className="text-sm text-slate-600 mb-6">Find the nearest State Agencies, Banks, and NBFCs.</p>
        
        {/* Placeholder for MapComponent */}
        <div id="map-placeholder" className="w-full rounded-xl overflow-hidden">
          <MapComponent /> 
        </div>
      </section>
    </main>
  );
}
