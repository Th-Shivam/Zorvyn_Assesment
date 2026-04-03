import React from 'react';

const EmptyState = () => {
  return (
    <div className="bg-surface-container-lowest rounded-[24px] p-16 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_-12px_rgba(25,28,30,0.04)] border border-white/50">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
        <span className="material-symbols-outlined text-[40px]">receipt_long</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">No transactions yet</h3>
      <p className="text-slate-500 max-w-sm">We couldn't find any transactions matching your filters. Try adjusting them or add a new entry.</p>
      <button className="mt-8 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-xl text-sm transition-all hover:bg-secondary-fixed active:scale-95">
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyState;
