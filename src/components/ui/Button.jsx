import React from 'react';

// Using tailwind-merge or standard template literals to allow class overrides
// Since tailwind-merge isn't guaranteed to be installed, we use standard combination logic.
// Base styles encapsulate our core 'premium' design system.

const variants = {
  primary: "bg-gradient-to-r from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95",
  ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 active:scale-95",
  outline: "border border-slate-200/50 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
  secondary: "bg-surface-container-low text-primary hover:bg-white active:scale-95",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-6 py-4 text-base",
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  fullWidth = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200";
  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full flex-1' : ''} ${className}`.trim();

  return (
    <button type={type} className={finalClassName} {...props}>
      {children}
    </button>
  );
};
