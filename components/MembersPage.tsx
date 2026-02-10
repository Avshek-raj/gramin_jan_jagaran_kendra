
import React from 'react';
import { Member } from '../types';

interface MembersPageProps {
  members: Member[];
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 text-center group">
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <img 
        src={member.imageUrl} 
        alt={member.name}
        className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-md"
      />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
    <p className="text-emerald-600 font-medium text-sm mb-4 uppercase tracking-tighter">{member.role}</p>
    <p className="text-slate-600 text-sm line-clamp-3 mb-6">{member.bio}</p>
    <div className="flex justify-center space-x-4">
      <a href={member.linkedIn} className="text-slate-400 hover:text-blue-600 transition-colors">
        <i className="fab fa-linkedin text-xl"></i>
      </a>
      <button className="text-slate-400 hover:text-emerald-500 transition-colors">
        <i className="fas fa-envelope text-xl"></i>
      </button>
    </div>
  </div>
);

const MembersPage: React.FC<MembersPageProps> = ({ members }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Dedicated Team</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Meet the passionate individuals who work tirelessly behind the scenes to drive change and support our global community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
