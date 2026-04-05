import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const Input = forwardRef(({ 
  icon, 
  iconPosition = 'left',
  label, 
  id,
  className = '', 
  containerClassName = '',
  ...props 
}, ref) => {
  const inputId = id || props.name || label?.toLowerCase().replace(/\s+/g, '-');
  
  const baseInputClasses = "w-full bg-surface-container-low border border-slate-200/20 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary/20 focus:bg-white transition-all duration-200 shadow-inner placeholder:text-slate-300";
  
  // Adjust padding if an icon is present
  const paddingClass = icon 
    ? (iconPosition === 'left' ? "pl-10 pr-4" : "pl-4 pr-10")
    : "px-4";

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={inputId} className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
            {icon}
          </span>
        )}
        <input 
          id={inputId}
          ref={ref}
          className={`${baseInputClasses} py-4 ${paddingClass} ${className}`.trim()} 
          {...props} 
        />
        {icon && iconPosition === 'right' && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};
