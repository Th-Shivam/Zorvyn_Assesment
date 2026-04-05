import React from 'react';
import PropTypes from 'prop-types';
import TransactionRow from './TransactionRow';
import EmptyState from './EmptyState';
import LoadMore from './LoadMore';
import { useRole } from '../context/RoleContext';
import { formatSignedCurrency, formatTransactionDate } from '../utils/transactionUtils';
import { transactionShape } from '../utils/propTypes';

const TransactionsTable = ({ transactions, onEdit, onClearFilters }) => {
  const { role } = useRole();
  const visibleCount = transactions.length;

  if (!transactions || transactions.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden ambient-shadow border border-white/50 shadow-[0_20px_50px_-12px_rgba(25,28,30,0.04)]">
      <div className="md:hidden divide-y divide-slate-100">
        {transactions.map((tx) => (
          <article key={tx.id} className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-2xl ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{tx.merchant}</p>
                  <p className="text-sm text-slate-500 truncate">{tx.categoryName} • {tx.subCategory}</p>
                </div>
              </div>
              <span className={`text-sm font-extrabold shrink-0 ${tx.type === 'Income' ? 'text-emerald-600' : 'text-error'}`}>
                {formatSignedCurrency(tx.type, tx.amount)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</p>
                <p className="mt-1 font-medium text-slate-700">{formatTransactionDate(tx.date)}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Type</p>
                <p className="mt-1 font-medium text-slate-700">{tx.type}</p>
              </div>
            </div>
            {role === 'admin' && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(tx)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  Edit
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest">Category</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest">Description</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest">Date</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest">Amount</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest">Type</th>
              {role === 'admin' && (
                <th className="px-8 py-5 text-[11px] font-bold text-on-secondary-container uppercase tracking-widest text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map(tx => (
              <TransactionRow key={tx.id} tx={tx} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
      <LoadMore visibleCount={visibleCount} totalCount={visibleCount} />
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default TransactionsTable;
