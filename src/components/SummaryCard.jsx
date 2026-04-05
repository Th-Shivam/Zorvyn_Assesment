import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTransactions } from '../context/TransactionsContext';
import { Card } from './ui/Card';
import {
  formatCurrency,
  getTransactionMetrics,
} from '../utils/transactionUtils';

const SummaryCards = () => {
  const { transactions } = useTransactions();
  const metrics = useMemo(() => getTransactionMetrics(transactions), [transactions]);
  const incomeDelta = metrics.currentMonthIncome - metrics.previousMonthIncome;
  const spendDeltaPercent = metrics.previousMonthExpense > 0
    ? ((metrics.currentMonthExpense - metrics.previousMonthExpense) / metrics.previousMonthExpense) * 100
    : 0;
  const balanceReference = Math.max(metrics.totalIncome, metrics.totalExpense, Math.abs(metrics.netBalance), 1);
  const balancePercent = Math.max(0, Math.min(100, Math.round((Math.abs(metrics.netBalance) / balanceReference) * 100)));

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
                <span className="material-symbols-outlined icon-filled text-[14px]">trending_up</span>
                {balancePercent}% net retained
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-6xl font-extrabold tracking-tighter text-white drop-shadow-sm">
                {formatCurrency(metrics.netBalance)}
              </span>
              <span className="text-white/40 text-xl font-medium">net</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span>Lifetime Flow</span>
              <span>
                {formatCurrency(metrics.totalIncome)} in / {formatCurrency(metrics.totalExpense)} out
              </span>
            </div>
            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-white to-indigo-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-700"
                style={{ width: `${balancePercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Income */}
      <Card>
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/5 flex items-center justify-center text-tertiary ring-1 ring-tertiary/10">
            <span className="material-symbols-outlined text-2xl">arrow_downward</span>
          </div>
          <span className="text-tertiary text-[10px] font-bold px-2 py-1 bg-tertiary/10 rounded-lg">
            {incomeDelta >= 0 ? `+₹${incomeDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(incomeDelta).toLocaleString('en-IN')}`} vs goal
          </span>
        </div>
        <div>
          <p className="uppercase tracking-widest text-slate-400 font-bold text-[10px] mb-2">
            Monthly Income
          </p>
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {formatCurrency(metrics.currentMonthIncome)}
          </h3>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Last Month</span>
          <span className="text-sm font-bold text-slate-900">{formatCurrency(metrics.previousMonthIncome)}</span>
        </div>
      </Card>

      {/* Total Expenses */}
      <Card>
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-error/5 flex items-center justify-center text-error ring-1 ring-error/10">
            <span className="material-symbols-outlined text-2xl">arrow_upward</span>
          </div>
          <span className="text-error text-[10px] font-bold px-2 py-1 bg-error/10 rounded-lg">
            {metrics.previousMonthExpense > 0 ? `${spendDeltaPercent >= 0 ? '+' : ''}${spendDeltaPercent.toFixed(1)}% vs last month` : 'No prior month'}
          </span>
        </div>
        <div>
          <p className="uppercase tracking-widest text-slate-400 font-bold text-[10px] mb-2">
            Monthly Spend
          </p>
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {formatCurrency(metrics.currentMonthExpense)}
          </h3>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Prev. Month</span>
          <span className="text-sm font-bold text-slate-900">{formatCurrency(metrics.previousMonthExpense)}</span>
        </div>
      </Card>
    </section>
  );
};

SummaryCards.propTypes = {};

export default SummaryCards;
