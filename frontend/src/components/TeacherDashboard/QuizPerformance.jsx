import React from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
export default function QuizPerformance({ performance = [] }) {
  
  // Sort by average_score descending
  const sortedPerformance = [...performance].sort((a, b) => (b.average_score || 0) - (a.average_score || 0));
  const getProgressBarColor = (score) => {
    if (score >= 8.0) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (score >= 6.0) return 'bg-gradient-to-r from-primary to-indigo-500';
    return 'bg-gradient-to-r from-orange-400 to-red-400';
  };
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Quiz Performance
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Student average scores and outcomes
        </p>
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
        {sortedPerformance.length > 0 ? (
          <div className="space-y-5">
            {sortedPerformance.map((item, idx) => {
              const scoreVal = parseFloat(item.average_score) || 0;
              const maxScore = parseFloat(item.max_score) || 10;
              const percent = Math.min((scoreVal / maxScore) * 100, 100);
              const barColor = getProgressBarColor(scoreVal);
              return (
                <div key={item.id || idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-darkGray line-clamp-1 flex items-center space-x-1.5">
                      <FaRegQuestionCircle className="w-3.5 h-3.5 text-slate-350 mr-1.5" />
                      <span>{item.quiz_title}</span>
                    </span>
                    
                    <span className="font-black text-slate-500 flex-shrink-0">
                      {scoreVal.toFixed(1)} <span className="text-[10px] text-slate-400 font-bold">/ {maxScore}</span>
                    </span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400 font-semibold">
            No quiz performance statistics compiled.
          </div>
        )}
      </div>
    </div>
  );
}
