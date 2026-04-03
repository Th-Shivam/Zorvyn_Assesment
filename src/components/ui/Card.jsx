import React from 'react';

// Defines a very basic Card container replicating the premium drop-shadow designs

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white p-8 rounded-3xl shadow-premium transition-standard premium-card flex flex-col ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
