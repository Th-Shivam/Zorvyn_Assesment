import React from 'react';
import { useRole } from '../context/RoleContext';
import { Button } from './ui/Button';

const TransactionsHeader = ({ 
  onAddClick, 
  searchQuery, setSearchQuery,
  typeFilter, setTypeFilter,
  dateFilter, setDateFilter,
  sortConfig, setSortConfig 
}) => {
  const { role } = useRole();
  return (
    <>
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-on-background">Transactions</h2>
          <p className="text-on-secondary-container font-medium">Track, filter, and manage your financial activity {role === 'viewer' && <span className="ml-2 text-primary font-bold text-xs bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Viewer Mode</span>}</p>
        </div>
        {role === 'admin' && (
          <Button onClick={onAddClick} size="md">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Entry
          </Button>
        )}
      </section>

      {/* Filters Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="group relative">
          <label className="absolute -top-2 left-3 bg-surface px-1 text-[10px] font-bold text-primary uppercase tracking-widest z-10">Type</label>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
          >
            <option value="All Transactions">All Transactions</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
        </div>
        <div className="group relative">
          <label className="absolute -top-2 left-3 bg-surface px-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10">Date Range</label>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
          >
            <option value="This month">This month</option>
            <option value="Last month">Last month</option>
            <option value="Custom range">Custom range</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_today</span>
        </div>
        <div className="group relative">
          <label className="absolute -top-2 left-3 bg-surface px-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10">Sort By</label>
          <select 
            value={sortConfig}
            onChange={(e) => setSortConfig(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
          >
            <option value="Date (Newest)">Date (Newest)</option>
            <option value="Amount (High to Low)">Amount (High to Low)</option>
            <option value="Amount (Low to High)">Amount (Low to High)</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">sort</span>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all" 
            placeholder="Search description..." 
            type="text"
          />
        </div>
      </section>
    </>
  );
};

export default TransactionsHeader;
