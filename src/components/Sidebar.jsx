import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ setCurrentPage, currentPage = 'Overview' }) => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 dark:bg-slate-950 flex-col py-8 px-4 border-r border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="min-w-[2.5rem] h-10 px-3 bg-primary-container rounded-xl flex items-center justify-center text-white shadow-lg">
          <span className="text-sm font-black uppercase tracking-[0.2em]">ZORVYN</span>
        </div>
        <div>
          <h1 className="text-lg font-black text-indigo-700 dark:text-indigo-400 leading-none">ZORVYN</h1>
          <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mt-1">Premium Tier</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <button 
          onClick={() => setCurrentPage('Overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors rounded-xl text-sm font-medium Inter ${
            currentPage === 'Overview' 
              ? 'text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/30'
          }`}
        >
          <span className={`material-symbols-outlined ${currentPage === 'Overview' ? 'icon-filled' : ''}`}>dashboard</span>
          Overview
        </button>
        <button 
          onClick={() => setCurrentPage('Transactions')}
          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors rounded-xl text-sm font-medium Inter ${
            currentPage === 'Transactions' 
              ? 'text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/30'
          }`}
        >
          <span className={`material-symbols-outlined ${currentPage === 'Transactions' ? 'icon-filled' : ''}`}>receipt_long</span>
          Transactions
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/30 transition-colors rounded-xl text-sm font-medium Inter">
          <span className="material-symbols-outlined">insert_chart</span>
          Analytics
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/30 transition-colors rounded-xl text-sm font-medium Inter">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          Wallets
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/30 transition-colors rounded-xl text-sm font-medium Inter">
          <span className="material-symbols-outlined">shield</span>
          Security
        </button>
      </nav>
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">
          <span className="material-symbols-outlined">help</span>
          Help Center
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error transition-colors text-sm font-medium">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Sidebar;
