
import React from 'react';
import { Program, ViewState } from '../types';
import ProgramCard from './ProgramCard';

interface LandingPageProps {
  setView: (view: ViewState) => void;
  programs: Program[];
}

const LandingPage: React.FC<LandingPageProps> = ({ setView, programs }) => {
  const activePrograms = programs.filter(p => p.status === 'active').slice(0, 3);
  const completedPrograms = programs.filter(p => p.status === 'completed').slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Gramin Jan Jagaran Kendra - Empowering Nepal"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md text-emerald-300 font-bold text-xs uppercase tracking-[0.2em]">
            Serving the Heart of Nepal
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Gramin Jan Jagaran Kendra: <br /><span className="text-emerald-400">Rural Awareness</span> & Growth.
          </h1>
          <p className="text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            A Nepali non-profit dedicated to transforming lives through innovative IT training, accessible healthcare, and grassroots community empowerment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setView('donate')}
              className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Support Our Mission
            </button>
            <button 
              onClick={() => setView('programs')}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest backdrop-blur-md transition-all active:scale-95"
            >
              Explore Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Broad Scope Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-2">What We Do</div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Beyond Healthcare</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We address the complex needs of rural Nepal with a multi-disciplinary approach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: 'Digital Literacy', desc: 'Establishing modern IT centers to give Nepali youth a global edge.', icon: 'fa-laptop-code', color: 'bg-blue-50 text-blue-600' },
              { title: 'Rural Health', desc: 'Mobile camps and maternal care in the hills and Terai regions.', icon: 'fa-heartbeat', color: 'bg-rose-50 text-rose-600' },
              { title: 'Social Awareness', desc: 'Rights education and empowerment programs for marginalized groups.', icon: 'fa-bullhorn', color: 'bg-emerald-50 text-emerald-600' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-xl group">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 border-t pt-16">
            <div>
              <div className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-2">Pioneering Change</div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Active Initiatives</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {activePrograms.map((program) => (
              <ProgramCard key={program.id} program={program} onClick={() => setView('donate')} />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Impact Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <div className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-2">Our Footprint</div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Our Legacy of Impact</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Highlighting some of the significant missions we have completed over the years.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {completedPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} onClick={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* Nepal Specific Stats */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Provinces Served', val: '7/7', icon: 'fa-map-signs' },
              { label: 'Rural Beneficiaries', val: '120k+', icon: 'fa-users' },
              { label: 'IT Trainees', val: '800+', icon: 'fa-graduation-cap' },
              { label: 'Partner Organizations', val: '45+', icon: 'fa-handshake' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-emerald-500 text-3xl mb-4"><i className={`fas ${stat.icon}`}></i></div>
                <div className="text-4xl font-black mb-2">{stat.val}</div>
                <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
