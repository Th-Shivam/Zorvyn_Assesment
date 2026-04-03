import React from 'react';

const LoadMore = () => {
  return (
    <div className="px-8 py-8 flex flex-col items-center border-t border-slate-50 md:border-transparent">
      <button className="px-8 py-3 bg-surface-container-high text-on-secondary-container rounded-full text-sm font-bold tracking-wide hover:bg-slate-200 hover:text-on-surface transition-all active:scale-95">
        Load More Entries
      </button>
      <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Showing 5 of 1,240 transactions</p>
    </div>
  );
};

export default LoadMore;
