import React from 'react';
export default function QuizHistoryEmpty() {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto">
      {/* 📚 Emoji */}
      <span className="text-5xl mb-6 select-none animate-pulse" role="img" aria-label="Books">
        📚
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No Quiz Attempts Yet
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Complete your first quiz to start tracking your performance metrics.
      </p>
    </div>
  );
}