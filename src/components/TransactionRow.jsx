import React from 'react';
import PropTypes from 'prop-types';
import { useRole } from '../context/RoleContext';
import { useTransactions } from '../context/TransactionsContext';
import { formatSignedCurrency, formatTransactionDate } from '../utils/transactionUtils';
import { transactionShape } from '../utils/propTypes';

const TransactionRow = ({ tx, onEdit }) => {
  const { role } = useRole();
  const { deleteTransaction } = useTransactions();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(tx.id);
    }
  };

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200 ease-out">
      <td className="px-6 md:px-8 py-2 md:py-6 flex items-center justify-between md:table-cell">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-full ${tx.iconBg} flex items-center justify-center ${tx.iconColor} group-hover:scale-110 transition-transform duration-300`}>
            <span className="material-symbols-outlined text-[22px]">{tx.icon}</span>
          </div>
          <div>
            <p className="font-semibold text-on-surface">{tx.categoryName}</p>
            <p className="text-xs text-slate-400">{tx.subCategory}</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 md:px-8 py-4 md:py-6">
        <p className="text-sm font-semibold text-on-surface">{tx.merchant}</p>
        <p className="text-xs text-slate-400">{tx.type === 'Income' ? 'Income received' : 'Expense recorded'}</p>
      </td>
      
      <td className="px-6 md:px-8 py-2 md:py-6 text-sm text-on-secondary-container font-medium">
        {formatTransactionDate(tx.date)}
      </td>
      
      <td className={`px-6 md:px-8 py-2 md:py-6 font-bold ${tx.type === 'Income' ? 'text-tertiary' : 'text-error'}`}>
        {formatSignedCurrency(tx.type, tx.amount)}
      </td>
      
      <td className="px-6 md:px-8 py-2 md:py-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
          tx.type === 'Income' 
            ? 'bg-tertiary-fixed/20 text-tertiary' 
            : 'bg-error-container/20 text-error'
        }`}>
          {tx.type}
        </span>
      </td>
      
      {role === 'admin' && (
        <td className="px-6 md:px-8 py-2 md:py-6 text-right">
          <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onEdit(tx)}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Edit transaction"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">edit</span>
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 hover:bg-error/10 rounded-lg transition-colors"
              aria-label="Delete transaction"
            >
              <span className="material-symbols-outlined text-error text-[18px]">delete</span>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

TransactionRow.propTypes = {
  tx: transactionShape.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TransactionRow;
