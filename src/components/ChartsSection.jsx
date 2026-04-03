import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { dashboardData } from '../data/mockData';
import { useTransactions } from '../context/TransactionsContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement
);

const ChartsSection = () => {
  const { transactions } = useTransactions();
  const { balanceTrend } = dashboardData.charts;

  // Dynamically calculate spending by category for the Doughnut Chart
  const expenseTransactions = transactions.filter(tx => tx.type === 'Expense');
  const totalExpense = expenseTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  
  const categorySums = {};
  expenseTransactions.forEach(tx => {
    const val = tx.amount;
    categorySums[tx.categoryName] = (categorySums[tx.categoryName] || 0) + val;
  });

  const colorMap = {
    'Shopping': '#4f46e5',
    'Food & Dining': '#e11d48',
    'Dining': '#e11d48',
    'Bills & Utilities': '#0d9488',
    'Utilities': '#0d9488',
    'Travel': '#ea580c',
    'Subscriptions': '#8b5cf6',
    'Electronics': '#8b5cf6',
    'Entertainment': '#ec4899',
    'Personal Care': '#06b6d4',
    'Other': '#64748b'
  };

  const dynamicCategories = Object.keys(categorySums).map(catName => ({
    name: catName,
    amount: categorySums[catName],
    percentage: totalExpense > 0 ? Math.round((categorySums[catName] / totalExpense) * 100) : 0,
    color: colorMap[catName] || colorMap['Other']
  })).sort((a,b) => b.percentage - a.percentage);

  // Enhance line chart with gradient and specific tooltip formatting
  const lineData = {
    labels: balanceTrend.dates,
    datasets: [
      {
        fill: true,
        data: balanceTrend.data,
        borderColor: '#4f46e5',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
          return gradient;
        },
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#4f46e5',
        bodyColor: '#0f172a',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: { size: 10, weight: 'bold', family: 'Inter' },
        bodyFont: { size: 16, weight: 'bold', family: 'Inter' },
        callbacks: {
          label: function(context) {
            return `₹${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: { display: false, min: 250000, max: 450000 },
      x: { display: false }
    },
    layout: {
      padding: { top: 20, bottom: 20, left: 10, right: 10 }
    }
  };

  const doughnutData = {
    labels: dynamicCategories.map(c => c.name),
    datasets: [
      {
        data: dynamicCategories.map(c => c.percentage),
        backgroundColor: dynamicCategories.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 10,
        cutout: '75%'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ` ${context.raw}%`;
          }
        }
      }
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Balance Trend Chart */}
      <Card className="lg:col-span-2 !p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h4 className="text-xl font-bold text-slate-900">Wealth Trajectory</h4>
            <p className="text-sm text-slate-400 mt-1">Growth overview over the last 30 days</p>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            <Button size="sm" className="bg-white shadow-sm !text-primary hover:!text-primary">
              30D
            </Button>
            <Button size="sm" variant="ghost">
              6M
            </Button>
            <Button size="sm" variant="ghost">
              1Y
            </Button>
          </div>
        </div>
        
        <div className="relative flex-1 min-h-[300px] w-full">
          {/* Subtle grid lines background overlay behind charting engine if needed, but omitted for clean minimalist look */}
          <Line data={lineData} options={lineOptions} />
        </div>
        
        {/* Custom manual labels matching HTML */}
        <div className="flex justify-between mt-8 px-2">
          {balanceTrend.dates.map((date, index) => (
            <span key={index} className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              {date}
            </span>
          ))}
        </div>
      </Card>

      {/* Spending Donut */}
      <Card className="!p-10 items-center">
        <h4 className="text-xl font-bold text-slate-900 w-full mb-10 text-left">Spending by Category</h4>
        <div className="relative flex-1 w-full flex items-center justify-center min-h-[200px]">
          <div className="w-52 h-52 absolute">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div className="absolute text-center z-10 pointer-events-none">
            <p className="text-3xl font-extrabold text-slate-900">₹{totalExpense > 0 ? (totalExpense/1000).toFixed(1) + 'k' : '0'}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Total Out
            </p>
          </div>
        </div>
        
        <div className="w-full mt-12 space-y-4">
          {dynamicCategories.length > 0 ? dynamicCategories.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between group transition-standard">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: cat.color, boxShadow: `0 1px 2px ${cat.color}60` }}
                ></div>
                <span className="text-sm font-semibold text-slate-600">{cat.name}</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{cat.percentage}%</span>
            </div>
          )) : (
            <p className="text-center text-sm text-slate-400 py-4 font-medium">No expenses recorded.</p>
          )}
        </div>
      </Card>
    </section>
  );
};

export default ChartsSection;
