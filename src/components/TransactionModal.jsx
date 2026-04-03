import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const TransactionModal = ({ isOpen, onClose, onSuccess }) => {
  const { addTransaction } = useTransactions();
  
  const [amount, setAmount] = useState('');
  const [categoryName, setCategoryName] = useState('Electronics');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('Expense');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    
    if (Number(amount) > 1000000000) {
      setError("Amount exceeds maximum safe limit.");
      return;
    }

    addTransaction({ amount: Number(amount), categoryName, date, type });
    if (onSuccess) onSuccess();
    onClose();
    
    // Reset defaults for next time
    setAmount('');
    setCategoryName('Electronics');
    setDate(new Date().toISOString().split('T')[0]);
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
          
          {error && (
            <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 mb-4 transition-all">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              label="Amount"
              icon={<span className="text-primary/60 text-lg">₹</span>}
              placeholder="0.00" 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            
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
              <Input 
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Transaction Type</label>
              <div className="flex p-1.5 bg-surface-container-low rounded-2xl">
                <button onClick={() => setType('Expense')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Expense' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} type="button">Expense</button>
                <button onClick={() => setType('Income')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Income' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} type="button">Income</button>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 pb-4">
              <Button variant="ghost" onClick={onClose} fullWidth>Cancel</Button>
              <Button type="submit" fullWidth>Save Ledger Entry</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
