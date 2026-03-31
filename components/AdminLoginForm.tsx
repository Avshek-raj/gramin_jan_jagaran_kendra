import React, { useState } from 'react';

interface AdminLoginFormProps {
  onLogin: (password: string) => boolean;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
          Admin Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Enter admin password"
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:bg-white bg-slate-50 outline-none transition-all"
        />
      </div>
      {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
      <button
        type="submit"
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/20 transition-all"
      >
        Login
      </button>
      <p className="text-xs text-slate-400 text-center italic">
        Hint: Use password "admin123" for demo purposes
      </p>
    </form>
  );
};

export default AdminLoginForm;
