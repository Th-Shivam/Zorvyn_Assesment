import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = ({ visibleCount, totalCount }) => {
  if (totalCount <= visibleCount) return null;

  return (
    <div className="px-8 py-8 flex flex-col items-center border-t border-slate-50 md:border-transparent">
      <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">
        Showing {visibleCount} of {totalCount} transactions
      </p>
    </div>
  );
};

LoadMore.propTypes = {
  visibleCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default LoadMore;
