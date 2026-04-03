import React from 'react';
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
      <Navbar />
      <main className="ml-64 pt-32 px-12 pb-20 min-h-screen">
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

export default Dashboard;
