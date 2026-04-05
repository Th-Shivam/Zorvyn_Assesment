import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTransactions } from '../context/TransactionsContext';
import { Button } from './ui/Button';
import { formatSignedCurrency, formatTransactionDate } from '../utils/transactionUtils';

const exportPreviewTransactions = (transactions) => {
  try {
    const headers = ['Date', 'Merchant', 'Category', 'Type', 'Amount'];
    const rows = transactions.map((tx) => [tx.date, tx.merchant, tx.categoryName, tx.type, tx.amount]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recent-transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export recent transactions:', error);
  }
};

const TransactionsPreview = () => {
  const { transactions } = useTransactions();
  const recentTransactions = useMemo(
    () => [...transactions]
      .sort((a, b) => new Date(`${b.date}T12:00:00`) - new Date(`${a.date}T12:00:00`))
      .slice(0, 5),
    [transactions]
  );
  const handleExport = useCallback(() => {
    exportPreviewTransactions(recentTransactions);
  }, [recentTransactions]);

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl shadow-premium premium-card flex flex-col overflow-hidden">
      <div className="p-10 pb-6 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-slate-900">Recent Activity</h4>
          <p className="text-sm text-slate-400 mt-1">Real-time status of your financial flows</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport} aria-label="Export recent transactions as CSV">
          Export CSV
        </Button>
      </div>
      
      <div className="flex-1 overflow-x-auto px-6 pb-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Account & Type</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Date</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/50">
            {recentTransactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-slate-50/70 transition-standard cursor-pointer">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tx.iconBg} ${tx.iconColor}`}>
                      <span className="material-symbols-outlined">{tx.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tx.merchant}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{tx.categoryName} • {tx.subCategory}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-slate-500 font-semibold text-center">
                  {formatTransactionDate(tx.date, { day: '2-digit', month: 'short' })}
                </td>
                <td className={`px-6 py-6 text-sm font-extrabold text-right ${tx.type === 'Income' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {formatSignedCurrency(tx.type, tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TransactionsPreview.propTypes = {};

export default TransactionsPreview;
