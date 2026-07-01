import React from 'react';
import { FaHistory, FaTrophy, FaAward, FaChartLine } from 'react-icons/fa';
export default function QuizHistoryStats({ attempts = [] }) {
  const totalAttempts = attempts.length;
  // Stats Calculations
  const averageScore = totalAttempts > 0 
    ? (attempts.reduce((sum, item) => sum + item.score, 0) / totalAttempts).toFixed(1) 
    : 0;
  const highestScore = totalAttempts > 0 
    ? Math.max(...attempts.map(item => item.score)) 
    : 0;
  const averageAccuracy = totalAttempts > 0 
    ? Math.round(attempts.reduce((sum, item) => {
        const accuracy = item.total_questions > 0 ? (item.score / item.total_questions) * 100 : 0;
        return sum + accuracy;
      }, 0) / totalAttempts)
    : 0;
  const statsCards = [
    {
      label: 'Total Attempts',
      value: totalAttempts,
      icon: <FaHistory className="w-5 h-5 text-primary" />,
      bg: 'bg-blue-50/70',
    },
    {
      label: 'Average Score',
      value: averageScore,
      icon: <FaAward className="w-5 h-5 text-secondary" />,
      bg: 'bg-green-50/70',
    },
    {
      label: 'Highest Score',
      value: highestScore,
      icon: <FaTrophy className="w-5 h-5 text-yellow-500" />,
      bg: 'bg-yellow-50/60',
    },
    {
      label: 'Average Accuracy',
      value: `${averageAccuracy}%`,
      icon: <FaChartLine className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50/70',
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {card.label}
            </span>
            <p className="text-2xl font-black text-darkGray font-sans">
              {card.value}
            </p>
          </div>
          
          {/* Decorative Icon Container */}
          <div className={`p-3.5 rounded-2xl ${card.bg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}