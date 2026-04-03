import React from 'react';
import { dashboardData } from '../data/mockData';

const InsightsSection = () => {
  const { insights } = dashboardData;

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
    <div className="bg-white p-10 rounded-3xl shadow-premium premium-card flex flex-col">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
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
                <p 
                  className="text-sm text-slate-400 mt-1.5 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: insight.description }}
                ></p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="mt-12 py-4 w-full bg-slate-50 text-primary text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white transition-standard border border-slate-100 hover:border-transparent active:scale-95">
        Analyze All Habits
      </button>
    </div>
  );
};

export default InsightsSection;
