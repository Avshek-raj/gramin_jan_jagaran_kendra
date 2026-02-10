
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-white mb-6">
              <i className="fas fa-hands-holding text-2xl text-emerald-500 mr-3"></i>
              <span className="text-2xl font-black tracking-tight">Gramin Jan Jagaran Kendra</span>
            </div>
            <p className="max-w-md text-slate-500 mb-6 leading-relaxed">
              Gramin Jan Jagaran Kendra is a registered Nepali non-governmental organization working towards a self-reliant and aware society in rural Nepal.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Our Sectors</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-500">IT & Digital Literacy</a></li>
              <li><a href="#" className="hover:text-emerald-500">Public Health Missions</a></li>
              <li><a href="#" className="hover:text-emerald-500">Skill Development</a></li>
              <li><a href="#" className="hover:text-emerald-500">Community Advocacy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect Nepal</h4>
            <p className="text-xs mb-4">Support our mission to bridge the digital and health gap.</p>
            <div className="flex bg-slate-800 p-1 rounded-xl">
              <input type="email" placeholder="Email" className="bg-transparent border-none px-4 py-2 w-full text-xs text-slate-300 focus:outline-none" />
              <button className="bg-emerald-600 text-white rounded-lg px-4 py-2 text-xs font-bold hover:bg-emerald-700">Join</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-[10px] font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Gramin Jan Jagaran Kendra (Nepal). All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Registration</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
