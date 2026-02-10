
import React, { useState } from 'react';
import { Program, Donation } from '../types';
import { generateThankYouNote } from '../services/geminiService';

interface DonationFlowProps {
  programs: Program[];
  onComplete: (donation: Donation) => void;
}

const DonationFlow: React.FC<DonationFlowProps> = ({ programs, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState<number>(50);
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [thankYouNote, setThankYouNote] = useState('');

  const handleNext = () => setStep(prev => (prev + 1) as any);
  const handleBack = () => setStep(prev => (prev - 1) as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const program = programs.find(p => p.id === selectedProgramId);
    
    // Generate AI Thank You
    const note = await generateThankYouNote(donorName || 'Anonymous Friend', amount, program?.title || 'our programs');
    setThankYouNote(note);

    const donation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      donorName: donorName || 'Anonymous',
      amount,
      programId: selectedProgramId,
      date: new Date().toISOString()
    };

    onComplete(donation);
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Progress Bar */}
        <div className="flex h-2 w-full bg-slate-100">
          <div className={`h-full bg-emerald-500 transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Choose a Cause</h2>
              <div className="space-y-4">
                {programs.map(p => (
                  <label 
                    key={p.id}
                    className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedProgramId === p.id 
                        ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                        : 'border-slate-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="program" 
                        checked={selectedProgramId === p.id}
                        onChange={() => setSelectedProgramId(p.id)}
                        className="hidden"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${selectedProgramId === p.id ? 'border-emerald-500' : 'border-slate-300'}`}>
                        {selectedProgramId === p.id && <div className="w-3 h-3 rounded-full bg-emerald-500"></div>}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">{p.category}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button 
                onClick={handleNext}
                className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Continue to Amount
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Donation Details</h2>
              
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-tight">Select Amount</label>
                <div className="grid grid-cols-3 gap-4">
                  {[10, 25, 50, 100, 250, 500].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        amount === val ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <div className="mt-4 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Other Amount"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-tight">Your Name (Optional)</label>
                <input 
                  type="text" 
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  disabled={loading}
                  className="w-2/3 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Complete Donation</span>
                      <i className="fas fa-heart"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <i className="fas fa-check text-4xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h2>
              <p className="text-slate-500 mb-8">Your contribution of <span className="font-bold text-emerald-600">${amount}</span> has been processed successfully.</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-200 mb-8 italic text-slate-700 relative">
                <i className="fas fa-quote-left absolute -top-3 -left-1 text-slate-200 text-4xl -z-10"></i>
                {thankYouNote}
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationFlow;
