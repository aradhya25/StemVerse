import React from 'react';
export default function QuizProgress({ currentIndex, totalIndex }) {
  const currentNum = currentIndex + 1;
  const progressPercent = Math.min(((currentNum) / totalIndex) * 100, 100);
  return (
    <div className="space-y-3 flex-shrink-0">
      
      {/* Label and percentages */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span>Question {currentNum} of {totalIndex}</span>
        <span className="text-primary">{Math.round(progressPercent)}% Complete</span>
      </div>
      {/* Progress Track Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-blue-700 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}