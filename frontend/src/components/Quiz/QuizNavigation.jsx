import React from 'react';
import { FaChevronLeft, FaChevronRight, FaPaperPlane } from 'react-icons/fa';
export default function QuizNavigation({
  onPrev,
  onNext,
  onSubmit,
  isFirst = false,
  isLast = false,
  hasAnswered = false
}) {
  return (
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-50 flex-shrink-0">
      
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 hover:border-slate-350 disabled:border-slate-100 disabled:opacity-50 text-darkGray-light disabled:text-slate-300 font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
      >
        <FaChevronLeft className="mr-2 w-3 h-3" />
        <span>Previous</span>
      </button>
      {/* Next / Submit Button */}
      {isLast ? (
        <button
          onClick={onSubmit}
          className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold rounded-xl shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <FaPaperPlane className="mr-2 w-3 h-3" />
          <span>Submit Quiz</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-250 hover:border-primary text-darkGray hover:text-primary font-bold rounded-xl text-xs transition-all active:scale-95"
        >
          <span>Next Question</span>
          <FaChevronRight className="ml-2 w-3 h-3" />
        </button>
      )}
    </div>
  );
}