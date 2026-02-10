
import React, { useState } from 'react';
import { Program } from '../types';
import ProgramCard from './ProgramCard';

interface ProgramsPageProps {
  programs: Program[];
  onDonate: (program: Program) => void;
}

const ProgramsPage: React.FC<ProgramsPageProps> = ({ programs, onDonate }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', 'Environment', 'Education', 'Health', 'Community'];

  const filtered = programs.filter(p => {
    const matchesStatus = p.status === activeTab;
    const matchesCategory = filter === 'All' || p.category === filter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100">
          Our global footprint
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Making a Difference</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          From active conservation projects to completed literacy programs, explore how your contributions turn into real-world change.
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'active' 
                ? 'bg-white text-emerald-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-rocket"></i>
            <span>Active Initiatives</span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
              activeTab === 'completed' 
                ? 'bg-white text-emerald-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-check-circle"></i>
            <span>Success Stories</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border ${
              filter === cat 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((program) => (
          <ProgramCard 
            key={program.id} 
            program={program} 
            onClick={() => program.status === 'active' ? onDonate(program) : alert(`Impact Report for ${program.title}: ${program.impactStatement}`)} 
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <i className="fas fa-search text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No programs found</h3>
            <p className="text-slate-500">Try adjusting your filters or category selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
