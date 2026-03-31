
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isUserLoggedIn?: boolean;
  onUserLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isUserLoggedIn, onUserLogout }) => {
  const navItems: { label: string; value: ViewState; icon: string }[] = [
    { label: 'Home', value: 'home', icon: 'fa-home' },
    { label: 'Our Work', value: 'programs', icon: 'fa-layer-group' },
    { label: 'Team', value: 'members', icon: 'fa-users' },
    { label: 'Contact', value: 'contact', icon: 'fa-envelope' },
    ...(isUserLoggedIn ? [{ label: 'Admin', value: 'admin' as ViewState, icon: 'fa-user-lock' }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-600 mr-3 group-hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-600/20 overflow-hidden">
              <img src="/assets/logo.jpeg" alt="Ganesha Logo" className="w-8 h-8" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Gramin Jan Jagaran Kendra
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Health • Education • Skill Development</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`flex items-center space-x-2 px-2 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                  currentView === item.value 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-slate-500 hover:text-emerald-500'
                }`}
              >
                <i className={`fas ${item.icon} text-xs`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setView('donate')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <i className="fas fa-heart text-xs"></i>
              <span>Support Now</span>
            </button>
            {!isUserLoggedIn ? (
              <button
                onClick={() => setView('login')}
                className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <i className="fas fa-user-lock"></i>
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onUserLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
