
import React, { useState } from 'react';
import { Program, Member, Donation } from '../types';
import { generateProgramDescription, generateImpactReport } from '../services/geminiService';

interface AdminDashboardProps {
  programs: Program[];
  members: Member[];
  donations: Donation[];
  onAddProgram: (program: Program) => void;
  onUpdateProgram: (program: Program) => void;
  onAddMember: (member: Member) => void;
  onDeleteProgram: (id: string) => void;
  onDeleteMember: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  programs, members, donations, onAddProgram, onUpdateProgram, onAddMember, onDeleteProgram, onDeleteMember 
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'members' | 'donations' | 'success-stories'>('programs');
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [editingProg, setEditingProg] = useState<Program | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Program Form State
  const [progTitle, setProgTitle] = useState('');
  const [progCat, setProgCat] = useState<Program['category']>('Environment');
  const [progDesc, setProgDesc] = useState('');
  const [progImpact, setProgImpact] = useState('');
  const [progGoal, setProgGoal] = useState(1000);
  const [progCollabs, setProgCollabs] = useState('');
  const [progGallery, setProgGallery] = useState('');

  const handleGenDescription = async () => {
    if (!progTitle) return alert("Enter a title first!");
    setAiGenerating(true);
    const desc = await generateProgramDescription(progTitle, progCat);
    setProgDesc(desc);
    setAiGenerating(false);
  };

  const handleGenImpact = async (prog: Program) => {
    setAiGenerating(true);
    const report = await generateImpactReport(prog);
    onUpdateProgram({ ...prog, impactStatement: report });
    setAiGenerating(false);
  };

  const openEditModal = (prog: Program) => {
    setEditingProg(prog);
    setProgTitle(prog.title);
    setProgCat(prog.category);
    setProgDesc(prog.description);
    setProgImpact(prog.impactStatement || '');
    setProgGoal(prog.goalAmount);
    setProgCollabs(prog.collaborators?.join(', ') || '');
    setProgGallery(prog.galleryImages?.join(', ') || '');
    setIsAddingProgram(true);
  };

  const toggleProgramStatus = (prog: Program) => {
    const newStatus = prog.status === 'active' ? 'completed' : 'active';
    onUpdateProgram({
      ...prog,
      status: newStatus,
    });
  };

  const submitProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const collaborators = progCollabs.split(',').map(s => s.trim()).filter(s => s);
    const gallery = progGallery.split(',').map(s => s.trim()).filter(s => s);

    if (editingProg) {
      onUpdateProgram({
        ...editingProg,
        title: progTitle,
        category: progCat,
        description: progDesc,
        impactStatement: progImpact,
        goalAmount: progGoal,
        collaborators,
        galleryImages: gallery
      });
    } else {
      const newProg: Program = {
        id: Date.now().toString(),
        title: progTitle,
        category: progCat,
        description: progDesc,
        impactStatement: progImpact,
        goalAmount: progGoal,
        currentAmount: 0,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`,
        status: 'active',
        collaborators,
        galleryImages: gallery
      };
      onAddProgram(newProg);
    }
    
    closeProgramModal();
  };

  const closeProgramModal = () => {
    setIsAddingProgram(false);
    setEditingProg(null);
    setProgTitle('');
    setProgDesc('');
    setProgImpact('');
    setProgCollabs('');
    setProgGallery('');
  };

  const submitMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMem: Member = {
      id: Date.now().toString(),
      name: memName,
      role: memRole,
      bio: memBio,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/400`,
      linkedIn: '#'
    };
    onAddMember(newMem);
    setIsAddingMember(false);
    setMemName('');
    setMemRole('');
    setMemBio('');
  };

  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('');
  const [memBio, setMemBio] = useState('');

  const completedPrograms = programs.filter(p => p.status === 'completed');
  const activePrograms = programs.filter(p => p.status === 'active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kendra Management</h1>
          <p className="text-slate-500 mt-1">Operational hub for Gramin Jan Jagaran Kendra.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto">
          {[
            { id: 'programs', label: 'Initiatives', icon: 'fa-layer-group' },
            { id: 'success-stories', label: 'Our Success Stories', icon: 'fa-award' },
            { id: 'members', label: 'Team', icon: 'fa-users' },
            { id: 'donations', label: 'Donations', icon: 'fa-receipt' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap flex items-center ${
                activeTab === tab.id ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'programs' && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-black text-slate-900">Active Initiatives</h2>
              <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-500 text-xs font-bold">{activePrograms.length} projects</span>
            </div>
            <button 
              onClick={() => setIsAddingProgram(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              <i className="fas fa-plus"></i>
              <span>Propose Initiative</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePrograms.map(prog => (
              <div key={prog.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{prog.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{prog.title}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => openEditModal(prog)} className="text-slate-300 hover:text-emerald-500 transition-colors p-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => onDeleteProgram(prog.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 line-clamp-3 mb-8 flex-grow leading-relaxed">{prog.description}</p>
                
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>${prog.currentAmount.toLocaleString()} Raised</span>
                    <span>Goal: ${prog.goalAmount.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => toggleProgramStatus(prog)}
                    className="w-full py-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Set as Completed & Success Story
                  </button>
                </div>
              </div>
            ))}
            {activePrograms.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400">No active initiatives currently. Propose a new one to get started.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'success-stories' && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Journey of Impact</h2>
              <p className="text-slate-500 mt-1">A professional record of completed missions and lives transformed.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {completedPrograms.map(prog => (
              <div key={prog.id} className="bg-emerald-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-emerald-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest inline-block mb-4">
                        <i className="fas fa-check-circle mr-1"></i> {prog.category} Milestone
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{prog.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => openEditModal(prog)} className="text-emerald-500 hover:text-white transition-colors p-2 bg-emerald-800/50 rounded-xl">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => onDeleteProgram(prog.id)} className="text-emerald-800 hover:text-red-400 transition-colors p-2">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="bg-emerald-800/30 p-6 rounded-2xl border border-emerald-700/50 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center">
                        <i className="fas fa-scroll mr-2"></i> Success Summary
                      </h4>
                      {!prog.impactStatement && (
                        <button 
                          onClick={() => handleGenImpact(prog)}
                          className="text-[9px] font-bold text-emerald-300 hover:text-white underline transition-all"
                          disabled={aiGenerating}
                        >
                          {aiGenerating ? 'Summarizing...' : 'Generate AI Report'}
                        </button>
                      )}
                    </div>
                    <p className="text-emerald-50 text-sm italic leading-relaxed">
                      {prog.impactStatement || "No success story documented yet. Please generate or write an impact statement to showcase this achievement."}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-emerald-800">
                    <div className="flex flex-col">
                      <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Investment Deployed</span>
                      <span className="text-white font-black text-2xl tracking-tight">${prog.currentAmount.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => toggleProgramStatus(prog)}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all border border-emerald-600"
                    >
                      Move to Active
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {completedPrograms.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                  <i className="fas fa-medal text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Build Your Legacy</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Achievements and completed projects marked as 'Success Stories' will appear here as a testament to our work.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="animate-fade-in">
           <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">Our Dedicated Team</h2>
            <button 
              onClick={() => setIsAddingMember(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center space-x-2 shadow-lg shadow-blue-600/20"
            >
              <i className="fas fa-plus"></i>
              <span>Add Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map(mem => (
              <div key={mem.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5 group">
                <img src={mem.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" alt="" />
                <div className="flex-grow">
                  <h3 className="font-black text-slate-900 leading-tight">{mem.name}</h3>
                  <p className="text-xs text-blue-600 font-black uppercase tracking-widest mt-1">{mem.role}</p>
                </div>
                <button onClick={() => onDeleteMember(mem.id)} className="text-slate-200 hover:text-red-500 transition-colors p-2">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          
          {isAddingMember && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
              <div className="bg-white rounded-[2rem] w-full max-w-lg p-10 shadow-2xl animate-scale-up">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Add Member</h3>
                  <button onClick={() => setIsAddingMember(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form onSubmit={submitMember} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                    <input required value={memName} onChange={e => setMemName(e.target.value)} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Role</label>
                    <input required value={memRole} onChange={e => setMemRole(e.target.value)} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Short Bio</label>
                    <textarea required value={memBio} onChange={e => setMemBio(e.target.value)} className="w-full h-24 px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none resize-none leading-relaxed"></textarea>
                  </div>
                  <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Add to Team</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'donations' && (
        <div className="animate-fade-in bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6">Donor Identity</th>
                <th className="px-10 py-6">Target Program</th>
                <th className="px-10 py-6">Amount</th>
                <th className="px-10 py-6 text-right">Processed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {donations.map(don => {
                const prog = programs.find(p => p.id === don.programId);
                return (
                  <tr key={don.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <i className="fas fa-user"></i>
                        </div>
                        <span className="font-bold text-slate-900">{don.donorName}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-slate-600 font-medium">
                      <span className="px-3 py-1 bg-slate-50 rounded-lg text-xs">{prog?.title || 'General Fund'}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-emerald-600 font-black tracking-tight text-lg">${don.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-6 text-slate-400 text-xs text-right font-bold">
                      {new Date(don.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
              {donations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-10 py-24 text-center">
                    <div className="text-slate-200 mb-4">
                      <i className="fas fa-receipt text-6xl"></i>
                    </div>
                    <p className="text-slate-400 font-medium italic">No donation records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isAddingProgram && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl p-10 shadow-2xl animate-scale-up border border-slate-100 my-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {editingProg ? 'Refine Records' : 'Launch New Initiative'}
              </h3>
              <button onClick={closeProgramModal} className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={submitProgram} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Program Title</label>
                  <input required value={progTitle} onChange={e => setProgTitle(e.target.value)} placeholder="e.g. Karnali Digital Literacy" className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 focus:bg-white bg-slate-50 outline-none transition-all" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
                  <select value={progCat} onChange={e => setProgCat(e.target.value as any)} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 focus:bg-white bg-slate-50 outline-none transition-all">
                    <option>Environment</option>
                    <option>Education</option>
                    <option>Health</option>
                    <option>Community</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mission Description</label>
                  <button 
                    type="button" 
                    onClick={handleGenDescription} 
                    className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 flex items-center bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 transition-all"
                    disabled={aiGenerating}
                  >
                    {aiGenerating ? 'Processing...' : <><i className="fas fa-magic mr-1.5"></i> AI Assist</>}
                  </button>
                </div>
                <textarea required value={progDesc} onChange={e => setProgDesc(e.target.value)} className="w-full h-24 px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 focus:bg-white bg-slate-50 outline-none transition-all resize-none leading-relaxed"></textarea>
              </div>

              <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-6">
                <h4 className="text-sm font-black text-emerald-700 flex items-center">
                  <i className="fas fa-star mr-2"></i> Legacy & Success Story
                </h4>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Impact Summary (Displayed once completed)</label>
                  <textarea value={progImpact} onChange={e => setProgImpact(e.target.value)} className="w-full h-32 px-5 py-4 rounded-2xl border-2 border-white focus:border-emerald-500 bg-white/80 outline-none transition-all resize-none leading-relaxed" placeholder="Highlight the final achievements and community impact..."></textarea>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Funding Goal ($)</label>
                <input type="number" required value={progGoal} onChange={e => setProgGoal(Number(e.target.value))} className="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 bg-slate-50 outline-none transition-all font-bold" />
              </div>
              
              <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-emerald-600 transition-all transform active:scale-[0.98]">
                {editingProg ? 'Save Changes' : 'Confirm & Launch'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
