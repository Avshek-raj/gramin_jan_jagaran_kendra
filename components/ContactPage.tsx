
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Donation Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'Donation Inquiry', message: '' });
    }, 2000);
  };

  const contactInfo = [
    { 
      icon: 'fa-envelope', 
      title: 'Email Us', 
      detail: 'info@graminjanjagarankendra.org.np', 
      color: 'bg-emerald-100 text-emerald-600' 
    },
    { 
      icon: 'fa-phone-alt', 
      title: 'Call Our Center', 
      detail: '+977-1-44XXXXX', 
      color: 'bg-teal-100 text-teal-600' 
    },
    { 
      icon: 'fa-map-marker-alt', 
      title: 'Head Office', 
      detail: 'Kathmandu, Bagmati Province, Nepal', 
      color: 'bg-orange-100 text-orange-600' 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100">
          Connect with Gramin Jan Jagaran Kendra
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Let's Build a <span className="text-emerald-600">Better Nepal</span> Together
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Whether you have questions about our IT training proposals, health missions, or wish to collaborate on social awareness, our team is here to listen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {contactInfo.map((info, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl`}>
              <i className={`fas ${info.icon}`}></i>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{info.title}</h3>
            <p className="text-slate-500 font-medium">{info.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
        <div className="lg:w-2/5 bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-8 leading-tight">Local Partnerships</h2>
            <p className="text-slate-400 mb-12 text-lg leading-relaxed">
              We work closely with local Palikas, community groups, and international donors to ensure our programs are sustainable and impactful across Nepal.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm shrink-0">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Grassroots Focused</h4>
                  <p className="text-slate-500 text-sm">Our strength lies in our deep connection with rural Nepali communities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm shrink-0">
                  <i className="fas fa-laptop"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Tech-Forward Nepal</h4>
                  <p className="text-slate-500 text-sm">Join our mission to bring digital opportunities to every village.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 p-12 lg:p-16">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-scale-up">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/10">
                <i className="fas fa-check-double"></i>
              </div>
              <h2 className="text-3xl font-black text-slate-900">Dhanyabaad!</h2>
              <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed">
                Thank you for reaching out. A representative from Gramin Jan Jagaran Kendra will contact you within 48 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 text-emerald-600 font-black text-sm uppercase tracking-widest border-2 border-emerald-100 rounded-2xl hover:bg-emerald-50 transition-all"
              >
                New Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message / Proposal</label>
                <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us how you'd like to support Gramin Jan Jagaran Kendra..." className="w-full px-6 py-4 rounded-3xl bg-slate-50 border-2 border-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all">
                Send to Team Nepal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
