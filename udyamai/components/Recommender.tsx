"use client";

import React, { useState } from 'react';

export default function Recommender() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    estimatedCost: '',
    incomeLevel: '',
    educationStatus: ''
  });
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRecommendation = () => {
    const cost = parseFloat(formData.estimatedCost) || 0;
    const income = parseFloat(formData.incomeLevel) || 0;
    let scheme = '';

    if (income > 500000) {
      scheme = 'Not Eligible for Concessional Schemes (Income > ₹5.00 Lakhs)';
    } else if (formData.projectType === 'Education') {
      scheme = 'Educational Loan Scheme';
    } else if (cost <= 140000) {
      scheme = 'Micro Finance Scheme';
    } else if (cost <= 5000000) {
      scheme = 'Term Loan Scheme';
    } else {
      scheme = 'Project funding exceeds maximum concessional limits.';
    }

    setRecommendation(scheme);
    setStep(5);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ projectType: '', estimatedCost: '', incomeLevel: '', educationStatus: '' });
    setRecommendation(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 w-full flex flex-col h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Smart Scheme Recommender</h2>
      <p className="text-sm text-slate-600 mb-6">Find the right financial assistance scheme based on your needs.</p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      <div className="flex-grow">
        {step === 1 && (
          <div className="space-y-4 fade-in">
            <label className="block text-sm font-medium text-slate-700">1. What type of project are you planning?</label>
            <select 
              name="projectType" 
              value={formData.projectType} 
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Project Type</option>
              <option value="Business">Small Business / Enterprise</option>
              <option value="Agriculture">Agriculture & Allied</option>
              <option value="Education">Higher Education</option>
              <option value="Service">Service Sector</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 fade-in">
            <label className="block text-sm font-medium text-slate-700">2. What is the estimated project cost (in ₹)?</label>
            <input 
              type="number" 
              name="estimatedCost" 
              value={formData.estimatedCost} 
              onChange={handleChange}
              placeholder="e.g. 100000"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 fade-in">
            <label className="block text-sm font-medium text-slate-700">3. What is your annual family income (in ₹)?</label>
            <input 
              type="number" 
              name="incomeLevel" 
              value={formData.incomeLevel} 
              onChange={handleChange}
              placeholder="e.g. 250000 (Max 5,00,000 for eligibility)"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 fade-in">
            <label className="block text-sm font-medium text-slate-700">4. What is your education status?</label>
            <select 
              name="educationStatus" 
              value={formData.educationStatus} 
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Education Status</option>
              <option value="Below 10th">Below 10th Grade</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate or Higher</option>
            </select>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 fade-in text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Recommended Scheme</h3>
            <p className="text-2xl font-bold text-green-700 p-4 bg-green-50 rounded-xl border border-green-200">
              {recommendation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between pt-4 border-t border-slate-100">
        {step > 1 && step < 5 && (
          <button 
            onClick={handleBack}
            className="px-5 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Back
          </button>
        )}
        
        {step === 1 && <div></div>} {/* Spacer */}

        {step < 4 && (
          <button 
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.projectType) || 
              (step === 2 && !formData.estimatedCost) || 
              (step === 3 && !formData.incomeLevel)
            }
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-auto"
          >
            Next Step
          </button>
        )}

        {step === 4 && (
          <button 
            onClick={generateRecommendation}
            disabled={!formData.educationStatus}
            className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-auto"
          >
            Find Scheme
          </button>
        )}

        {step === 5 && (
          <button 
            onClick={resetForm}
            className="w-full px-5 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}
