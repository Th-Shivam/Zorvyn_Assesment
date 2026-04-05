import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TransactionsHeader from './TransactionsHeader';
import TransactionsTable from './TransactionsTable';
import TransactionModal from './TransactionModal';
import { useTransactions } from '../context/TransactionsContext';
import { useRole } from '../context/RoleContext';
import { formatCurrency, getMonthlyComparison, getTransactionMetrics, parseTransactionDate } from '../utils/transactionUtils';

const exportTransactions = (transactions) => {
  try {
    const headers = ['Date', 'Merchant', 'Category', 'Type', 'Amount'];
    const rows = transactions.map((tx) => [
      tx.date,
      tx.merchant,
      tx.categoryName,
      tx.type,
      tx.amount,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions-export.csv';
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export transactions:', error);
  }
};

const TransactionsPage = ({ setCurrentPage, currentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  const { role } = useRole();
  
  const showToast = (action) => {
    const msg = action === 'updated' ? 'Transaction updated successfully!' : 'Ledger entry saved successfully!';
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Transactions');
  const [dateFilter, setDateFilter] = useState('All time');
  const [sortConfig, setSortConfig] = useState('Date (Newest)');

  const { transactions } = useTransactions();
  const metrics = useMemo(() => getTransactionMetrics(transactions), [transactions]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(transactions), [transactions]);

  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Date Filter
    if (dateFilter !== 'All time') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      result = result.filter(tx => {
        const txDate = parseTransactionDate(tx.date);
        if (!txDate) return false;
        const txMonth = txDate.getMonth();
        const txYear = txDate.getFullYear();

        if (dateFilter === 'This month') {
          return txMonth === currentMonth && txYear === currentYear;
        } else if (dateFilter === 'Last month') {
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return txMonth === lastMonth && txYear === lastMonthYear;
        } else if (dateFilter === 'Last 3 months') {
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          return txDate >= threeMonthsAgo;
        }
        return true;
      });
    }

    // Type Filter
    if (typeFilter !== 'All Transactions') {
      result = result.filter(tx => tx.type === typeFilter);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(tx => 
        tx.merchant.toLowerCase().includes(lowerQuery) || 
        tx.subCategory.toLowerCase().includes(lowerQuery) ||
        tx.categoryName.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortConfig === 'Date (Newest)') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortConfig === 'Amount (High to Low)') {
        return b.amount - a.amount;
      } else if (sortConfig === 'Amount (Low to High)') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, searchQuery, typeFilter, dateFilter, sortConfig]);

  const handleEdit = useCallback((transaction) => {
    if (role !== 'admin') return;
    setEditTransaction(transaction);
    setIsModalOpen(true);
  }, [role]);

  const handleAddClick = useCallback(() => {
    if (role !== 'admin') return;
    setEditTransaction(null);
    setIsModalOpen(true);
  }, [role]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditTransaction(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setTypeFilter('All Transactions');
    setDateFilter('All time');
    setSortConfig('Date (Newest)');
  }, []);

  const handleExport = useCallback(() => {
    exportTransactions(processedTransactions);
  }, [processedTransactions]);

  const comparisonLabel = monthlyComparison.previous.expense > 0
    ? `${monthlyComparison.current.label} expenses are ${
      metrics.currentMonthExpense >= monthlyComparison.previous.expense ? 'up' : 'down'
    } ${formatCurrency(Math.abs(metrics.currentMonthExpense - monthlyComparison.previous.expense))} from ${monthlyComparison.previous.label}.`
    : 'Add transactions across two months to unlock monthly comparison.';

  return (
    <>
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Navbar title="Transactions" subtitle="Filter, review, and manage your ledger without losing context." currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="ml-0 md:ml-64 pt-40 md:pt-32 px-4 md:px-12 pb-20 min-h-screen">
        <TransactionsHeader 
          onAddClick={handleAddClick}
          onExport={handleExport}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
        
        <TransactionsTable transactions={processedTransactions} onEdit={handleEdit} onClearFilters={handleClearFilters} />

        {/* Dynamic Insights Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-primary-container p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">Spending Analysis</h3>
              <p className="text-indigo-100/80 max-w-md">
                {metrics.totalExpense > 0 
                  ? comparisonLabel
                  : 'No expense data available yet. Start tracking your transactions!'}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-200">Top Category</span>
                  <span className="block text-xl font-bold">{metrics.topCategory}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-200">Total Outflow</span>
                  <span className="block text-xl font-bold">{formatCurrency(metrics.totalExpense)}</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-20 rotate-12 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col justify-between border border-slate-200/50">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined icon-filled">savings</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Net Savings</h3>
              <p className="text-3xl font-extrabold text-primary">
                {formatCurrency(metrics.netBalance)}
              </p>
              <p className="text-sm text-on-secondary-container leading-relaxed">
                {metrics.netBalance >= 0 
                  ? `${metrics.savingsRate}% of your income is still being retained after expenses.`
                  : `Your total expenses are above total income. Review high-spend categories.`}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <TransactionModal 
        key={`${isModalOpen ? 'open' : 'closed'}-${editTransaction?.id ?? 'new'}`}
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSuccess={showToast}
        editTransaction={editTransaction}
      />

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-standard z-50 slide-up-animation">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
        </div>
      )}
    </>
  );
};

TransactionsPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default TransactionsPage;
