import React from 'react';
import { dashboardData } from '../data/mockData';
import { useRole } from '../context/RoleContext';

const Navbar = () => {
  const { user } = dashboardData;
  const { role, setRole } = useRole();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-20 bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 flex justify-between items-center px-12 z-40">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Overview</h2>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 border-r border-slate-200/50 pr-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-100/60 border-none rounded-xl text-sm py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-primary/10 cursor-pointer text-slate-600 font-medium"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="relative search-focus transition-standard group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary">
            search
          </span>
          <input
            className="pl-11 pr-5 py-2.5 bg-slate-100/60 border-none rounded-full text-sm focus:ring-0 w-80 transition-standard placeholder:text-slate-400 shadow-inner-soft"
            placeholder="Search insights or records..."
            type="text"
          />
        </div>
        <button className="relative p-2.5 text-slate-500 hover:text-primary transition-standard bg-slate-100/60 rounded-full hover:bg-slate-100 shadow-inner-soft">
          <span className="material-symbols-outlined text-2xl">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white shadow-sm shadow-error/30"></span>
        </button>
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-[10px] text-primary font-extrabold uppercase tracking-widest">{user.tier}</p>
          </div>
          <div className="relative group">
            <img
              alt="User"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md transition-standard group-hover:shadow-primary/20"
              src={user.avatar}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-tertiary-fixed-dim rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
