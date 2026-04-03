import React from 'react';
import TransactionRow from './TransactionRow';
import EmptyState from './EmptyState';
import LoadMore from './LoadMore';
import { useRole } from '../context/RoleContext';

const TransactionsTable = ({ transactions }) => {
  const { role } = useRole();

  if (!transactions || transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden ambient-shadow border border-white/50 shadow-[0_20px_50px_-12px_rgba(25,28,30,0.04)]">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="hidden md:table-header-group">
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
          <tbody className="divide-y divide-slate-50 md:divide-slate-50 flex flex-col md:table-row-group">
            {transactions.map(tx => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
      <LoadMore />
    </div>
  );
};

export default TransactionsTable;
