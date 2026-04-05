import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SummaryCards from './SummaryCard';
import ChartsSection from './ChartsSection';
import InsightsSection from './InsightsSection';
import TransactionsPreview from './TransactionsPreview';

const Dashboard = ({ setCurrentPage, currentPage }) => {
  return (
    <>
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <Navbar title="Overview" subtitle="Track balance, spending mix, and the signals that matter." currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="ml-0 md:ml-64 pt-40 md:pt-32 px-4 md:px-12 pb-20 min-h-screen">
        <SummaryCards />
        <ChartsSection />
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InsightsSection />
          <TransactionsPreview />
        </section>
      </main>
    </>
  );
};

Dashboard.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Dashboard;
