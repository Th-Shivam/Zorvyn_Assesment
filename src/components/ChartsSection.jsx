import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
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
import { useTransactions } from '../context/TransactionsContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  formatCurrency,
  getCategoryColor,
  getTrendData,
  getTransactionMetrics,
} from '../utils/transactionUtils';

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
  const [selectedRange, setSelectedRange] = useState('30D');
  const metrics = useMemo(() => getTransactionMetrics(transactions), [transactions]);
  const selectedTrend = useMemo(
    () => getTrendData(transactions, selectedRange),
    [transactions, selectedRange]
  );
  const dynamicCategories = useMemo(() => {
    return Object.entries(metrics.categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: metrics.totalExpense > 0 ? Math.round((amount / metrics.totalExpense) * 100) : 0,
        color: getCategoryColor(name),
      }))
      .sort((first, second) => second.amount - first.amount);
  }, [metrics.categoryTotals, metrics.totalExpense]);
  const chartRangeOptions = ['30D', '6M', '1Y'];
  const lineBounds = useMemo(() => {
    const values = selectedTrend.data.length > 0 ? selectedTrend.data : [0];
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 0);
    if (min === max) {
      return { min: min - 1000, max: max + 1000 };
    }
    const padding = Math.max((max - min) * 0.15, 1000);
    return { min: min - padding, max: max + padding };
  }, [selectedTrend.data]);

  const lineData = useMemo(() => ({
    labels: selectedTrend.labels,
    datasets: [
      {
        fill: true,
        data: selectedTrend.data,
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
  }), [selectedTrend]);

  const lineOptions = useMemo(() => ({
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
            return formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: { display: false, min: lineBounds.min, max: lineBounds.max },
      x: { display: false }
    },
    layout: {
      padding: { top: 20, bottom: 20, left: 10, right: 10 }
    }
  }), [lineBounds.max, lineBounds.min]);

  const doughnutData = useMemo(() => ({
    labels: dynamicCategories.map(c => c.name),
    datasets: [
      {
        data: dynamicCategories.map(c => c.amount),
        backgroundColor: dynamicCategories.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 10,
        cutout: '75%'
      }
    ]
  }), [dynamicCategories]);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const amount = dynamicCategories[context.dataIndex]?.amount || 0;
            const percentage = dynamicCategories[context.dataIndex]?.percentage || 0;
            return `${formatCurrency(amount)} (${percentage}%)`;
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
            <p className="text-sm text-slate-400 mt-1">Net cash movement built from actual transactions</p>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {chartRangeOptions.map((range) => (
              <Button
                key={range}
                type="button"
                size="sm"
                variant={selectedRange === range ? 'secondary' : 'ghost'}
                className={selectedRange === range ? 'bg-white shadow-sm !text-primary hover:!text-primary' : ''}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="relative flex-1 min-h-[300px] w-full">
          <Line data={lineData} options={lineOptions} />
        </div>
        
        <div className="flex justify-between mt-8 px-2">
          {selectedTrend.labels.map((date, index) => (
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
            <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(metrics.totalExpense)}</p>
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

ChartsSection.propTypes = {};

export default ChartsSection;
