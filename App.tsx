
import React, { useState, useEffect } from 'react';
import { Program, Member, Donation, ViewState, Stat } from './types';
import { INITIAL_PROGRAMS, INITIAL_MEMBERS, INITIAL_STATS } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProgramsPage from './components/ProgramsPage';
import MembersPage from './components/MembersPage';
import DonationFlow from './components/DonationFlow';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import AdminLoginForm from './components/AdminLoginForm';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const saved = localStorage.getItem('ngo_admin_logged_in');
    return saved === 'true';
  });
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
  const [stats, setStats] = useState<Stat[]>(() => {
    const saved = localStorage.getItem('ngo_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
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

  useEffect(() => {
    localStorage.setItem('ngo_stats', JSON.stringify(stats));
  }, [stats]);

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

  const handleAdminLogin = (password: string): boolean => {
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('ngo_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('ngo_admin_logged_in');
    setView('home');
  };

  const handleAddComment = (programId: string, comment: any) => {
    setPrograms(prev => prev.map(p => 
      p.id === programId 
        ? { ...p, comments: [...(p.comments || []), comment] }
        : p
    ));
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <LandingPage setView={setView} programs={programs} stats={stats} onAddComment={handleAddComment} />;
      case 'programs':
        return <ProgramsPage programs={programs} onDonate={(p) => setView('donate')} onAddComment={handleAddComment} />;
      case 'members':
        return <MembersPage members={members} />;
      case 'contact':
        return <ContactPage />;
      case 'donate':
        return <DonationFlow programs={programs.filter(p => p.status === 'active')} onComplete={handleDonation} />;
      case 'admin':
        if (!isAdminLoggedIn) {
          return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Admin Login</h2>
              <AdminLoginForm onLogin={handleAdminLogin} />
            </div>
          );
        }
        return (
          <AdminDashboard 
            programs={programs} 
            members={members} 
            donations={donations}
            stats={stats}
            onAddProgram={handleAddProgram}
            onUpdateProgram={handleUpdateProgram}
            onAddMember={handleAddMember}
            onUpdateStats={setStats}
            onDeleteProgram={(id) => setPrograms(prev => prev.filter(p => p.id !== id))}
            onDeleteMember={(id) => setMembers(prev => prev.filter(m => m.id !== id))}
            onLogout={handleAdminLogout}
          />
        );
      default:
        return <LandingPage setView={setView} programs={programs} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentView={view} setView={setView} isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
