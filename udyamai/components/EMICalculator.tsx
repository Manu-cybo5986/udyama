"use client";

import React, { useState, useEffect } from 'react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(6);

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    // EMI Calculation Logic
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    
    // Effective repayment months after moratorium
    const repaymentMonths = (tenureYears * 12) - moratoriumMonths;

    if (repaymentMonths > 0) {
      // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
      const emiVal = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, repaymentMonths)) / 
                     (Math.pow(1 + ratePerMonth, repaymentMonths) - 1);
      
      const totalPay = emiVal * repaymentMonths;
      const totalInt = totalPay - principal;

      setEmi(Math.round(emiVal));
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totalInt));
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, tenureYears, moratoriumMonths]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 w-full flex flex-col h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Financial Calculator</h2>
      <p className="text-sm text-slate-600 mb-6">Estimate your monthly EMIs and total interest payable.</p>

      <div className="space-y-6 flex-grow">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-slate-700">Loan Amount (₹)</label>
            <span className="text-sm font-bold text-blue-600">₹{loanAmount.toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" 
            min="10000" 
            max="5000000" 
            step="10000"
            value={loanAmount} 
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹10K</span>
            <span>₹50L</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-slate-700">Interest Rate (% p.a.)</label>
            <span className="text-sm font-bold text-blue-600">{interestRate}%</span>
          </div>
          <input 
            type="range" 
            min="6.5" 
            max="15" 
            step="0.1"
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>6.5%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-slate-700">Tenure (Years)</label>
            <span className="text-sm font-bold text-blue-600">{tenureYears} Years</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            step="1"
            value={tenureYears} 
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 Y</span>
            <span>10 Y</span>
          </div>
        </div>

        {/* Moratorium Period */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-slate-700">Moratorium Period (Months)</label>
            <span className="text-sm font-bold text-blue-600">{moratoriumMonths} Months</span>
          </div>
          <input 
            type="range" 
            min="3" 
            max="12" 
            step="1"
            value={moratoriumMonths} 
            onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3 M</span>
            <span>12 M</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">During moratorium, EMIs are paused but interest may accrue.</p>
        </div>
      </div>

      {/* Results Box */}
      <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Monthly EMI</p>
            <p className="text-2xl font-bold text-blue-700">₹{emi.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Interest</p>
            <p className="text-2xl font-bold text-slate-700">₹{totalInterest.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-200 text-center">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Amount Payable</p>
          <p className="text-lg font-bold text-slate-800">₹{totalPayment.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}
