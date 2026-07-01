import React from 'react';
import { FaEye, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaBookOpen } from 'react-icons/fa';
export default function QuizHistoryCard({ attempt, onViewDetails }) {
  if (!attempt) return null;
  const {
    id,
    quiz_title,
    lesson_title,
    course_title,
    score,
    total_questions,
    attempted_at
  } = attempt;
  const accuracy = total_questions > 0 ? Math.round((score / total_questions) * 100) : 0;
  const isPassed = accuracy >= 50;
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) + ' ' + date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 space-y-4 md:hidden">
      
      {/* Title & Status Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
            Quiz Attempt
          </span>
          <h4 className="text-sm font-extrabold text-darkGray leading-tight">
            {quiz_title}
          </h4>
        </div>
        {/* Status Badge */}
        {isPassed ? (
          <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
            <FaCheckCircle className="w-2 h-2 text-secondary" />
            <span>Passed</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-1 bg-red-50 text-red-500 text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
            <FaTimesCircle className="w-2 h-2 text-red-500" />
            <span>Failed</span>
          </span>
        )}
      </div>
      {/* Meta specifications */}
      <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold border-t border-b border-slate-50 py-3">
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-slate-400">Course</span>
          <p className="text-darkGray truncate">{course_title}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-slate-400">Lesson</span>
          <p className="text-darkGray truncate">{lesson_title}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-slate-400">Score & Total</span>
          <p className="text-darkGray font-bold">{score} / {total_questions}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-slate-400">Accuracy</span>
          <p className="text-primary font-extrabold">{accuracy}%</p>
        </div>
      </div>
      {/* Date & Button Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold">
          <FaCalendarAlt className="w-3.5 h-3.5" />
          <span>{formatDate(attempted_at)}</span>
        </div>
        <button
          onClick={() => onViewDetails(id)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-5 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary font-bold rounded-xl text-xs transition-all active:scale-95"
        >
          <FaEye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}