import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTransactions } from '../context/TransactionsContext';
import { Card } from './ui/Card';
import {
  formatCurrency,
  getMonthlyComparison,
  getTransactionMetrics,
} from '../utils/transactionUtils';

const InsightsSection = () => {
  const { transactions } = useTransactions();
  const metrics = useMemo(() => getTransactionMetrics(transactions), [transactions]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(transactions), [transactions]);
  const expenseDifference = monthlyComparison.current.expense - monthlyComparison.previous.expense;
  const savingsDifference = metrics.monthlyNet - metrics.previousMonthlyNet;
  const insights = [
    {
      id: 1,
      type: 'warning',
      icon: 'pie_chart',
      title: metrics.topCategory !== 'N/A' ? `${metrics.topCategory} is your largest spend bucket` : 'No spending category yet',
      description: metrics.topCategory !== 'N/A'
        ? `${formatCurrency(metrics.topCategoryAmount)} has gone to ${metrics.topCategory}, making it your largest expense category.`
        : 'Add expense transactions to unlock category-level insights.',
    },
    {
      id: 2,
      type: 'alert',
      icon: 'bar_chart',
      title: monthlyComparison.previous.expense > 0 ? 'Monthly expense comparison is available' : 'Monthly comparison needs more data',
      description: monthlyComparison.previous.expense > 0
        ? `${monthlyComparison.current.label} expenses are ${expenseDifference >= 0 ? 'up' : 'down'} ${formatCurrency(Math.abs(expenseDifference))} versus ${monthlyComparison.previous.label}.`
        : 'You need transactions across two different months to compare spending trends.',
    },
    {
      id: 3,
      type: 'reward',
      icon: 'savings',
      title: metrics.totalIncome > 0 ? `Savings rate is ${metrics.savingsRate}%` : 'Income data is missing',
      description: metrics.totalIncome > 0
        ? `Net savings for ${monthlyComparison.current.label} are ${formatCurrency(metrics.monthlyNet)}, ${savingsDifference >= 0 ? 'up' : 'down'} ${formatCurrency(Math.abs(savingsDifference))} from last month.`
        : 'Add income entries to measure savings rate and month-over-month performance.',
    },
  ];

  const getStyleForInsight = (type) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-100/50',
          hoverBg: 'group-hover:bg-indigo-100',
          textColor: 'text-primary'
        };
      case 'alert':
        return {
          bg: 'bg-red-50',
          border: 'border-red-100/50',
          hoverBg: 'group-hover:bg-red-100',
          textColor: 'text-error'
        };
      case 'reward':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-100/50',
          hoverBg: 'group-hover:bg-emerald-100',
          textColor: 'text-tertiary'
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-100/50',
          hoverBg: 'group-hover:bg-slate-100',
          textColor: 'text-slate-500'
        };
    }
  };

  return (
    <Card className="!p-10">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined icon-filled">
            auto_awesome
          </span>
        </div>
        <h4 className="text-xl font-bold text-slate-900">Smart Insights</h4>
      </div>
      
      <div className="space-y-10 flex-1 px-1">
        {insights.map((insight) => {
          const style = getStyleForInsight(insight.type);
          
          return (
            <div key={insight.id} className="flex gap-5 group">
              <div 
                className={`flex-shrink-0 w-12 h-12 rounded-full ${style.bg} flex items-center justify-center ${style.textColor} border ${style.border} ${style.hoverBg} transition-standard`}
              >
                <span className="material-symbols-outlined text-xl">{insight.icon}</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">{insight.title}</p>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

InsightsSection.propTypes = {};

export default InsightsSection;
