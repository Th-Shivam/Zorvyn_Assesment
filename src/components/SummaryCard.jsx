import React from 'react';
import { dashboardData } from '../data/mockData';
import { useTransactions } from '../context/TransactionsContext';

const SummaryCards = () => {
  const { transactions } = useTransactions();
  const { balance, income, spend } = dashboardData.metrics;

  // Calculate dynamic data based on historical mock scale
  const rawIncome = transactions.reduce((acc, tx) => tx.type === 'Income' ? acc + parseFloat(tx.amount.replace(/[^\d.-]/g, '')) : acc, 0);
  const rawSpend = transactions.reduce((acc, tx) => tx.type === 'Expense' ? acc + parseFloat(tx.amount.replace(/[^\d.-]/g, '')) : acc, 0);
  
  // Create a base balance to represent history not visibly shown in the recent list
  const baseBalance = 1322500; 
  const rawBalance = baseBalance + rawIncome - rawSpend;

  const dynamicIncome = rawIncome.toLocaleString('en-IN');
  const dynamicSpend = rawSpend.toLocaleString('en-IN');
  const dynamicBalance = rawBalance.toLocaleString('en-IN');

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
      {/* Main Card */}
      <div className="lg:col-span-2 mesh-gradient p-10 rounded-3xl shadow-xl relative overflow-hidden group transition-standard premium-card border-none">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-white/10 group-hover:scale-110"></div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="uppercase tracking-[0.2em] text-white/60 font-bold text-[10px]">
                Total Available Balance
              </span>
              <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {balance.change}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-6xl font-extrabold tracking-tighter text-white drop-shadow-sm">
                ₹{dynamicBalance}
              </span>
              <span className="text-white/40 text-xl font-medium">{balance.decimals}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span>Savings Milestone</span>
              <span>
                {balance.milestone.percent}% of {balance.milestone.goal} goal
              </span>
            </div>
            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-white to-indigo-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] progress-fill-animate"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Income */}
      <div className="bg-white p-8 rounded-3xl shadow-premium transition-standard premium-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/5 flex items-center justify-center text-tertiary ring-1 ring-tertiary/10">
            <span className="material-symbols-outlined text-2xl">arrow_downward</span>
          </div>
          <span className="text-tertiary text-[10px] font-bold px-2 py-1 bg-tertiary/10 rounded-lg">
            {income.todayChange}
          </span>
        </div>
        <div>
          <p className="uppercase tracking-widest text-slate-400 font-bold text-[10px] mb-2">
            Monthly Income
          </p>
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">
            ₹{dynamicIncome}
          </h3>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Budget Avg</span>
          <span className="text-sm font-bold text-slate-900">{income.budgetAvg}</span>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-white p-8 rounded-3xl shadow-premium transition-standard premium-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-error/5 flex items-center justify-center text-error ring-1 ring-error/10">
            <span className="material-symbols-outlined text-2xl">arrow_upward</span>
          </div>
          <span className="text-error text-[10px] font-bold px-2 py-1 bg-error/10 rounded-lg">
            {spend.budgetDiff}
          </span>
        </div>
        <div>
          <p className="uppercase tracking-widest text-slate-400 font-bold text-[10px] mb-2">
            Monthly Spend
          </p>
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">
            ₹{dynamicSpend}
          </h3>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Prev. Month</span>
          <span className="text-sm font-bold text-slate-900">{spend.prevMonth}</span>
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
