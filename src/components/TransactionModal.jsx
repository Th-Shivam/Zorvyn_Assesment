import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTransactions } from '../context/TransactionsContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TRANSACTION_TYPES } from '../utils/transactionUtils';
import { transactionShape } from '../utils/propTypes';

const getInitialFormState = (editTransaction) => ({
  amount: editTransaction ? editTransaction.amount.toString() : '',
  categoryName: editTransaction?.categoryName || '',
  merchant: editTransaction?.merchant || '',
  date: editTransaction?.date || new Date().toISOString().split('T')[0],
  type: editTransaction?.type || 'Expense',
});

const validateForm = ({ amount, categoryName, merchant, date, type }) => {
  const nextErrors = {};

  if (!amount || Number(amount) <= 0) {
    nextErrors.amount = 'Please enter an amount greater than 0.';
  }

  if (!merchant.trim()) {
    nextErrors.merchant = 'Merchant is required.';
  }

  if (!categoryName.trim()) {
    nextErrors.categoryName = 'Category is required.';
  }

  if (!date) {
    nextErrors.date = 'Date is required.';
  }

  if (!TRANSACTION_TYPES.includes(type)) {
    nextErrors.type = 'Transaction type is required.';
  }

  return nextErrors;
};

const TransactionModal = ({ isOpen, onClose, onSuccess, editTransaction }) => {
  const { addTransaction, updateTransaction, transactions } = useTransactions();
  const initialState = getInitialFormState(editTransaction);
  const [amount, setAmount] = useState(initialState.amount);
  const [categoryName, setCategoryName] = useState(initialState.categoryName);
  const [merchant, setMerchant] = useState(initialState.merchant);
  const [date, setDate] = useState(initialState.date);
  const [type, setType] = useState(initialState.type);
  const [errors, setErrors] = useState({});
  const amountInputRef = useRef(null);
  const modalRef = useRef(null);

  const isEditMode = !!editTransaction;
  const categoryOptions = useMemo(() => {
    const categories = new Set(
      transactions
        .map((transaction) => transaction.categoryName)
        .filter(Boolean)
    );
    return [...categories].sort((first, second) => first.localeCompare(second));
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateForm({ amount, categoryName, merchant, date, type });

    if (Number(amount) > 1000000000) {
      nextErrors.amount = 'Amount exceeds maximum safe limit.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const transactionData = { 
      amount: Number(amount), 
      categoryName, 
      merchant: merchant || 'Manual Entry',
      date, 
      type 
    };

    if (isEditMode) {
      updateTransaction(editTransaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    if (onSuccess) onSuccess(isEditMode ? 'updated' : 'added');
    onClose();
  };

  const handleClose = useCallback(() => {
    setErrors({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    amountInputRef.current?.focus();

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'Tab' && focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div ref={modalRef} className="bg-white w-full max-w-lg rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.05)] overflow-hidden scale-100 border border-slate-200/50">
        <div className="px-10 pt-10 pb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 id="modal-title" className="text-2xl font-bold text-slate-900">
                {isEditMode ? 'Edit Transaction' : 'New Transaction'}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {isEditMode ? 'Update transaction details' : 'Fill in the details to record your entry.'}
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 hover:rotate-90 hover:scale-110 rounded-full transition-all duration-300 ease-out"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          {Object.keys(errors).length > 0 && (
            <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 mb-4 transition-all" role="alert">
              <span className="material-symbols-outlined text-[18px]">error</span>
              Please fix the highlighted fields.
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input 
              ref={amountInputRef}
              label="Amount"
              icon={<span className="text-primary/60 text-lg">₹</span>}
              placeholder="0.00" 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {errors.amount && <p className="mt-2 text-sm text-error">{errors.amount}</p>}

            <Input 
              label="Merchant"
              placeholder="e.g., Amazon, Starbucks" 
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              required
            />
            {errors.merchant && <p className="mt-2 text-sm text-error">{errors.merchant}</p>}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category</label>
                <input
                  list="transaction-categories"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  aria-label="Transaction category"
                  placeholder="Enter or select a category"
                  className="w-full px-4 py-4 bg-surface-container-low border border-slate-200/20 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all duration-200 shadow-inner"
                />
                <datalist id="transaction-categories">
                  {categoryOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
                {errors.categoryName && <p className="mt-2 text-sm text-error">{errors.categoryName}</p>}
              </div>
              <div>
                <Input 
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                {errors.date && <p className="mt-2 text-sm text-error">{errors.date}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Transaction Type</label>
              <div className="flex p-1.5 bg-surface-container-low rounded-2xl">
                <button 
                  onClick={() => setType('Expense')} 
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Expense' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} 
                  type="button"
                  aria-pressed={type === 'Expense'}
                >
                  Expense
                </button>
                <button 
                  onClick={() => setType('Income')} 
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all duration-200 ${type === 'Income' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white/50'}`} 
                  type="button"
                  aria-pressed={type === 'Income'}
                >
                  Income
                </button>
              </div>
              {errors.type && <p className="mt-2 text-sm text-error">{errors.type}</p>}
            </div>
            
            <div className="flex gap-4 pt-4 pb-4">
              <Button variant="ghost" onClick={handleClose} fullWidth type="button">Cancel</Button>
              <Button type="submit" fullWidth>
                {isEditMode ? 'Update Transaction' : 'Save Ledger Entry'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

TransactionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  editTransaction: transactionShape,
};

export default TransactionModal;
