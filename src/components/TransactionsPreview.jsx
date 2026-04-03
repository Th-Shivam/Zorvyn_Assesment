import React from 'react';
import { dashboardData } from '../data/mockData';

const TransactionsPreview = () => {
  const { transactions } = dashboardData;

  const getIconStyle = (isPositive) => {
    return isPositive 
      ? "bg-emerald-50 text-emerald-600 group-hover:bg-white group-hover:shadow-md transition-standard"
      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-md transition-standard";
  };

  const getAmountStyle = (isPositive) => {
    return isPositive
      ? "text-emerald-500"
      : "text-red-500";
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl shadow-premium premium-card flex flex-col overflow-hidden">
      <div className="p-10 pb-6 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-slate-900">Recent Activity</h4>
          <p className="text-sm text-slate-400 mt-1">Real-time status of your financial flows</p>
        </div>
        <button className="px-6 py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-white border border-primary/20 rounded-xl transition-standard active:scale-95">
          Export CSV
        </button>
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
            {transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-slate-50/70 transition-standard cursor-pointer">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${getIconStyle(tx.isPositive)}`}>
                      <span className="material-symbols-outlined">{tx.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tx.merchant}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{tx.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-slate-500 font-semibold text-center">
                  {tx.date}
                </td>
                <td className={`px-6 py-6 text-sm font-extrabold text-right ${getAmountStyle(tx.isPositive)}`}>
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPreview;
