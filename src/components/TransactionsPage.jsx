import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TransactionsHeader from './TransactionsHeader';
import TransactionsTable from './TransactionsTable';
import TransactionModal from './TransactionModal';
import { useTransactions } from '../context/TransactionsContext';

const TransactionsPage = ({ setCurrentPage, currentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Transactions');
  const [dateFilter, setDateFilter] = useState('This month');
  const [sortConfig, setSortConfig] = useState('Date (Newest)');

  const { transactions } = useTransactions();

  // Process transactions based on filters and sort
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // 1. Filter by Type
    if (typeFilter !== 'All Transactions') {
      result = result.filter(tx => tx.type === typeFilter);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(tx => 
        tx.merchant.toLowerCase().includes(lowerQuery) || 
        tx.subCategory.toLowerCase().includes(lowerQuery) ||
        tx.categoryName.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortConfig === 'Date (Newest)') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortConfig === 'Amount (High to Low)' || sortConfig === 'Amount (Low to High)') {
        return sortConfig === 'Amount (High to Low)' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, searchQuery, typeFilter, sortConfig]);

  return (
    <>
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Navbar />
      <main className="ml-64 pt-32 px-12 pb-20 min-h-screen">
        <TransactionsHeader 
          onAddClick={() => setIsModalOpen(true)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
        />
        
        <TransactionsTable transactions={processedTransactions} />

        {/* Contextual Insights Section (Editorial Layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-primary-container p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">Spending Analysis</h3>
              <p className="text-indigo-100/80 max-w-md">
                Your retail spending has increased by 12% compared to last month. Consider reviewing your subscriptions to optimize cash flow.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-200">Top Category</span>
                  <span className="block text-xl font-bold">Shopping</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-indigo-200">Total Outflow</span>
                  <span className="block text-xl font-bold">₹1,41,600</span>
                </div>
              </div>
            </div>
            {/* Decorative Background Image */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-20 rotate-12 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col justify-between border border-slate-200/50">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Auto-Categorize</h3>
              <p className="text-sm text-on-secondary-container leading-relaxed">
                Let Ledger Prime AI handle your bookkeeping. 98% accuracy on all recent merchant tags.
              </p>
            </div>
            <button className="mt-8 text-primary font-bold text-sm flex items-center gap-2 group">
              Enable Ledger AI
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>
      </main>
      
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => showToast('Ledger entry saved successfully!')} 
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-standard z-50 slide-up-animation">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default TransactionsPage;
