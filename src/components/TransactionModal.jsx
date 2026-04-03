import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionsContext';

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  
  const [amount, setAmount] = useState('');
  const [categoryName, setCategoryName] = useState('Electronics');
  const [date, setDate] = useState('2024-05-14');
  const [type, setType] = useState('Expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    addTransaction({ amount, categoryName, date, type });
    onClose();
    
    // Reset defaults for next time
    setAmount('');
    setCategoryName('Electronics');
    setDate('2024-05-14');
    setType('Expense');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
      {/* Add Transaction Modal */}
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] overflow-hidden scale-100 border border-slate-200/50">
        <div className="px-10 pt-10 pb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">New Transaction</h3>
              <p className="text-slate-500 text-sm mt-1">Fill in the details to record your entry.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 hover:rotate-90 hover:scale-110 rounded-full transition-all duration-300 ease-out"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary/60 text-lg">₹</span>
                <input 
                  className="w-full pl-10 pr-4 py-4 bg-surface-container-low border border-slate-200/20 rounded-2xl text-xl font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all duration-200 shadow-inner placeholder:text-slate-300" 
                  placeholder="0.00" 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
                <select 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-4 bg-surface-container-low border border-slate-200/20 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all duration-200 shadow-inner appearance-none cursor-pointer"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Salary">Salary</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Travel">Travel</option>
                  <option value="Dining">Dining</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Date</label>
                <input 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-4 bg-surface-container-low border border-slate-200/20 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all duration-200 shadow-inner" 
                  type="date" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Transaction Type</label>
              <div className="flex p-1.5 bg-surface-container-low rounded-2xl">
                <button onClick={() => setType('Expense')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Expense' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} type="button">Expense</button>
                <button onClick={() => setType('Income')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Income' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} type="button">Income</button>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 pb-4">
              <button 
                onClick={onClose} 
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all duration-200" 
                type="button"
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-4 px-6 rounded-2xl font-bold bg-gradient-to-r from-primary to-primary-container text-white shadow-xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200" 
                type="submit"
              >
                Save Ledger Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
