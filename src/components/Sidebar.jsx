import React from 'react';

const Sidebar = ({ setCurrentPage, currentPage = 'Overview' }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col py-8 px-4 h-full border-r border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white shadow-lg">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
        </div>
        <div>
          <h1 className="text-lg font-black text-indigo-700 dark:text-indigo-400 leading-none">Lumina Ledger</h1>
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
          <span className="material-symbols-outlined" style={currentPage === 'Overview' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
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
          <span className="material-symbols-outlined" style={currentPage === 'Transactions' ? { fontVariationSettings: "'FILL' 1" } : {}}>receipt_long</span>
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

export default Sidebar;
