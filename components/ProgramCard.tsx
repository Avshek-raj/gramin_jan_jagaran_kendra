
import React, { useState } from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onClick }) => {
  const [showStory, setShowStory] = useState(false);
  const isCompleted = program.status === 'completed';
  const progress = Math.min((program.currentAmount / program.goalAmount) * 100, 100);

  const handleAction = () => {
    if (isCompleted) {
      setShowStory(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <div className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group border ${isCompleted ? 'border-emerald-100' : 'border-slate-100'}`}>
        <div className="relative h-56 overflow-hidden">
          <img 
            src={program.imageUrl} 
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            {program.category}
          </div>

          {isCompleted && (
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center space-x-1">
              <i className="fas fa-check-circle"></i>
              <span>Goal Reached</span>
            </div>
          )}
        </div>
        
        <div className="p-8 flex-grow">
          <h3 className={`text-2xl font-black mb-3 tracking-tight leading-tight transition-colors ${isCompleted ? 'text-emerald-700' : 'text-slate-900 group-hover:text-emerald-600'}`}>
            {program.title}
          </h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-3">
            {program.description}
          </p>
          
          {!isCompleted ? (
            <div className="mb-2">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Current Progress</div>
                  <div className="text-emerald-600 font-black text-lg">${program.currentAmount.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Target</div>
                  <div className="text-slate-900 font-bold text-sm">${program.goalAmount.toLocaleString()}</div>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <div className="text-emerald-800 font-bold text-xs flex items-center mb-1">
                <i className="fas fa-medal mr-2"></i> Total Impact Created
              </div>
              <div className="text-emerald-600 font-black text-xl tracking-tight">
                ${program.currentAmount.toLocaleString()} Fully Deployed
              </div>
            </div>
          )}
        </div>
        
        <div className="p-8 pt-0">
          <button 
            onClick={handleAction}
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-3 shadow-lg transform active:scale-95 ${
              isCompleted 
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
            }`}
          >
            <span>{isCompleted ? 'Read Success Story' : 'Support this cause'}</span>
            <i className={`fas ${isCompleted ? 'fa-arrow-right' : 'fa-heart'} text-xs`}></i>
          </button>
        </div>
      </div>

      {/* Success Story Modal */}
      {showStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-lg animate-fade-in">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setShowStory(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 text-slate-900 flex items-center justify-center transition-all"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="overflow-y-auto">
              <div className="h-80 relative">
                <img 
                  src={program.imageUrl} 
                  className="w-full h-full object-cover" 
                  alt={program.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              <div className="px-10 pb-12 -mt-20 relative">
                <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-50">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {program.category}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      Completed 2024
                    </span>
                  </div>
                  
                  <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    {program.title}
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                      <section>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center">
                          <i className="fas fa-book-open mr-2"></i> The Journey
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-lg italic">
                          "{program.impactStatement || program.description}"
                        </p>
                      </section>

                      {program.galleryImages && program.galleryImages.length > 0 && (
                        <section>
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-4">
                            Program Gallery
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {program.galleryImages.map((img, idx) => (
                              <div key={idx} className="h-32 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>

                    <div className="space-y-8">
                      {program.collaborators && program.collaborators.length > 0 && (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                            Our Collaborators
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.collaborators.map((col, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm">
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-emerald-600 p-6 rounded-2xl text-white">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">
                          Total Investment
                        </h4>
                        <div className="text-2xl font-black mb-1">
                          ${program.currentAmount.toLocaleString()}
                        </div>
                        <p className="text-xs text-emerald-100 opacity-80">
                          Every dollar was spent on direct implementation and community support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramCard;
