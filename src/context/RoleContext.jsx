/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const RoleContext = createContext();
const ROLE_STORAGE_KEY = 'zorvyn-role';

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    if (typeof window === 'undefined') return 'admin';

    try {
      const savedRole = window.localStorage.getItem(ROLE_STORAGE_KEY);
      return savedRole === 'viewer' || savedRole === 'admin' ? savedRole : 'admin';
    } catch {
      return 'admin';
    }
  });

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
      } catch {
        // Ignore storage write failures and keep the app usable.
      }
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleRoleChange }}>
      {children}
    </RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useRole = () => useContext(RoleContext);
