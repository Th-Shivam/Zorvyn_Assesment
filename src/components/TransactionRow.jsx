import React from 'react';
import { useRole } from '../context/RoleContext';

const TransactionRow = ({ tx }) => {
  const { role } = useRole();
  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200 ease-out cursor-default border-b border-slate-50 md:border-none flex flex-col md:table-row py-4 md:py-0">
      {/* Mobile labels (visually hidden on desktop, used for card view) */}
      
      <td className="px-6 md:px-8 py-2 md:py-6 flex items-center justify-between md:table-cell">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-full ${tx.iconBg} flex items-center justify-center ${tx.iconColor} group-hover:scale-110 transition-transform duration-300`}>
            <span className="material-symbols-outlined text-[22px]">{tx.icon}</span>
          </div>
          <span className="font-semibold text-on-surface">{tx.categoryName}</span>
        </div>
        {/* Mobile Amount */}
        <span className={`md:hidden font-bold ${tx.type === 'Income' ? 'text-tertiary' : 'text-error'}`}>
          {tx.type === 'Income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </span>
      </td>
      
      <td className="px-6 md:px-8 py-4 md:py-6 text-right md:text-left flex justify-between md:table-cell order-3 md:order-none col-span-2">
        <span className="md:hidden text-[11px] font-bold uppercase tracking-widest text-slate-400">Amount</span>
        <span className={`font-extrabold tracking-tight text-lg ${tx.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>
          {tx.type === 'Income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </span>
      </td>
      
      <td className="px-6 md:px-8 py-2 md:py-6 text-sm text-on-secondary-container font-medium hidden md:table-cell">
        {new Date(tx.date + 'T12:00:00').toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
      </td>
      
      <td className={`px-6 md:px-8 py-2 md:py-6 font-bold hidden md:table-cell ${tx.type === 'Income' ? 'text-tertiary' : 'text-error'}`}>
        {tx.type === 'Income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
      </td>
      
      <td className="px-6 md:px-8 py-2 md:py-6 hidden md:table-cell">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
          tx.type === 'Income' 
            ? 'bg-tertiary-fixed/20 text-tertiary' 
            : 'bg-error-container/20 text-error'
        }`}>
          {tx.type}
        </span>
      </td>
      
      {role === 'admin' && (
        <td className="px-6 md:px-8 py-2 md:py-6 text-right hidden md:table-cell">
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;
