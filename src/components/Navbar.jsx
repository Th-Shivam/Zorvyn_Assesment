import React from 'react';
import PropTypes from 'prop-types';
import { dashboardData } from '../data/mockData';
import { useRole } from '../context/RoleContext';

const Navbar = ({ title, subtitle, currentPage, setCurrentPage }) => {
  const { user } = dashboardData;
  const { role, setRole } = useRole();

  return (
    <header className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] min-h-20 bg-white/80 backdrop-blur-2xl border-b border-slate-200/40 px-4 md:px-12 py-4 z-40">
      <div className="flex justify-between items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1 hidden md:block">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 md:border-r md:border-slate-200/50 md:pr-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            aria-label="Switch user role"
            className="bg-slate-100/60 border-none rounded-xl text-sm py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-primary/10 cursor-pointer text-slate-600 font-medium"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-[10px] text-primary font-extrabold uppercase tracking-widest">{role} access</p>
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
      </div>
      {setCurrentPage && (
        <div className="md:hidden mt-4 flex gap-2 rounded-2xl bg-slate-100 p-1">
          {['Overview', 'Transactions'].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                currentPage === page ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
};

export default Navbar;
