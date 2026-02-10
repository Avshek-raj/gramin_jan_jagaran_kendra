
import React, { useState, useEffect } from 'react';
import { Program, Member, Donation, ViewState } from './types';
import { INITIAL_PROGRAMS, INITIAL_MEMBERS } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProgramsPage from './components/ProgramsPage';
import MembersPage from './components/MembersPage';
import DonationFlow from './components/DonationFlow';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem('ngo_programs');
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('ngo_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('ngo_donations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ngo_programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('ngo_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('ngo_donations', JSON.stringify(donations));
  }, [donations]);

  const handleAddProgram = (newProgram: Program) => {
    setPrograms(prev => [newProgram, ...prev]);
  };

  const handleUpdateProgram = (updatedProgram: Program) => {
    setPrograms(prev => prev.map(p => p.id === updatedProgram.id ? updatedProgram : p));
  };

  const handleAddMember = (newMember: Member) => {
    setMembers(prev => [newMember, ...prev]);
  };

  const handleDonation = (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
    setPrograms(prev => prev.map(p => 
      p.id === donation.programId 
        ? { ...p, currentAmount: p.currentAmount + donation.amount }
        : p
    ));
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <LandingPage setView={setView} programs={programs} />;
      case 'programs':
        return <ProgramsPage programs={programs} onDonate={(p) => setView('donate')} />;
      case 'members':
        return <MembersPage members={members} />;
      case 'contact':
        return <ContactPage />;
      case 'donate':
        return <DonationFlow programs={programs.filter(p => p.status === 'active')} onComplete={handleDonation} />;
      case 'admin':
        return (
          <AdminDashboard 
            programs={programs} 
            members={members} 
            donations={donations}
            onAddProgram={handleAddProgram}
            onUpdateProgram={handleUpdateProgram}
            onAddMember={handleAddMember}
            onDeleteProgram={(id) => setPrograms(prev => prev.filter(p => p.id !== id))}
            onDeleteMember={(id) => setMembers(prev => prev.filter(m => m.id !== id))}
          />
        );
      default:
        return <LandingPage setView={setView} programs={programs} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentView={view} setView={setView} />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
