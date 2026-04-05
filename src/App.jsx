import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TransactionsPage from './components/TransactionsPage';
import ErrorBoundary from './components/ErrorBoundary';

import { RoleProvider } from './context/RoleContext';
import { TransactionsProvider } from './context/TransactionsContext';

function App() {
  const [currentPage, setCurrentPage] = useState('Overview');

  return (
    <ErrorBoundary>
      <RoleProvider>
        <TransactionsProvider>
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] font-body text-on-surface antialiased min-h-screen">
            {currentPage === 'Overview' && <Dashboard setCurrentPage={setCurrentPage} currentPage={currentPage} />}
            {currentPage === 'Transactions' && <TransactionsPage setCurrentPage={setCurrentPage} currentPage={currentPage} />}
          </div>
        </TransactionsProvider>
      </RoleProvider>
    </ErrorBoundary>
  );
}

export default App;
