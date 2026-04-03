/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { dashboardData } from '../data/mockData';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(dashboardData.premiumTransactions);

  const addTransaction = (newTx) => {
    // Generate a quick mock ID and inject defaults for icon/bg
    const id = Date.now();
    let icon, iconBg, iconColor;

    switch(newTx.type) {
      case 'Income':
        icon = 'payments';
        iconBg = 'bg-emerald-50';
        iconColor = 'text-emerald-600';
        break;
      case 'Expense':
      default:
        icon = 'shopping_bag';
        iconBg = 'bg-blue-50';
        iconColor = 'text-blue-600';
        if (newTx.categoryName === 'Dining') { icon = 'restaurant'; iconBg = 'bg-amber-50'; iconColor = 'text-amber-600'; }
        if (newTx.categoryName === 'Travel') { icon = 'flight'; iconBg = 'bg-purple-50'; iconColor = 'text-purple-600'; }
        if (newTx.categoryName === 'Utilities') { icon = 'bolt'; iconBg = 'bg-amber-50'; iconColor = 'text-amber-600'; }
        break;
    }

    const transaction = {
      id,
      categoryName: newTx.categoryName,
      merchant: "Manual Entry",
      subCategory: newTx.categoryName,
      date: ReactDateFormat(newTx.date),
      amount: `${newTx.type === 'Income' ? '+' : '-'}₹${newTx.amount.toLocaleString()}`,
      type: newTx.type,
      icon,
      iconBg,
      iconColor,
      ...newTx
    };

    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);

// Extremely simple date formatter for mock consistency
function ReactDateFormat(dateString) {
  if (!dateString) return "Just now";
  const dateObj = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return dateObj.toLocaleDateString('en-US', options).replace(',', ',');
}
