/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { dashboardData } from '../data/mockData';
import { getTransactionVisuals } from '../utils/transactionUtils';

const TransactionsContext = createContext();
const TRANSACTIONS_STORAGE_KEY = 'zorvyn-transactions';

const getStoredTransactions = () => {
  if (typeof window === 'undefined') return dashboardData.premiumTransactions;

  const savedTransactions = window.localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  if (!savedTransactions) return dashboardData.premiumTransactions;

  try {
    const parsedTransactions = JSON.parse(savedTransactions);
    return Array.isArray(parsedTransactions) ? parsedTransactions : dashboardData.premiumTransactions;
  } catch {
    return dashboardData.premiumTransactions;
  }
};

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(getStoredTransactions);

  const addTransaction = (newTx) => {
    const id = Date.now() + Math.random();
    const { icon, iconBg, iconColor } = getTransactionVisuals(newTx.categoryName, newTx.type);

    const transaction = {
      id,
      categoryName: newTx.categoryName,
      merchant: newTx.merchant || "Manual Entry",
      subCategory: newTx.categoryName,
      date: newTx.date,
      amount: Number(newTx.amount),
      type: newTx.type,
      icon,
      iconBg,
      iconColor,
    };

    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (id, updatedTx) => {
    setTransactions(prev => prev.map(tx => 
      tx.id === id
        ? {
            ...tx,
            ...updatedTx,
            ...getTransactionVisuals(updatedTx.categoryName, updatedTx.type),
            amount: Number(updatedTx.amount),
            merchant: updatedTx.merchant || tx.merchant,
            subCategory: updatedTx.categoryName,
          }
        : tx
    ));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

TransactionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTransactions = () => useContext(TransactionsContext);
