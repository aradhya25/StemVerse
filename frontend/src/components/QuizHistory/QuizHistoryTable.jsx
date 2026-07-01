import React from 'react';
import { FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
export default function QuizHistoryTable({ attempts = [], onViewDetails }) {
  
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
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="py-4.5 px-6">Quiz</th>
              <th className="py-4.5 px-6">Course</th>
              <th className="py-4.5 px-6">Lesson</th>
              <th className="py-4.5 px-6 text-center">Score</th>
              <th className="py-4.5 px-6 text-center">Accuracy</th>
              <th className="py-4.5 px-6">Attempted On</th>
              <th className="py-4.5 px-6 text-center">Status</th>
              <th className="py-4.5 px-6 text-center">Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
            {attempts.map((attempt) => {
              const accuracy = attempt.total_questions > 0 
                ? Math.round((attempt.score / attempt.total_questions) * 100) 
                : 0;
              const isPassed = accuracy >= 50;
              return (
                <tr 
                  key={attempt.id} 
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  {/* Quiz */}
                  <td className="py-4 px-6 font-extrabold text-darkGray">
                    {attempt.quiz_title}
                  </td>
                  
                  {/* Course */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {attempt.course_title}
                  </td>
                  
                  {/* Lesson */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    {attempt.lesson_title}
                  </td>
                  
                  {/* Score */}
                  <td className="py-4 px-6 text-center font-bold">
                    {attempt.score} <span className="text-slate-400 text-[10px]">/ {attempt.total_questions}</span>
                  </td>
                  
                  {/* Accuracy */}
                  <td className="py-4 px-6 text-center">
                    <span className="font-extrabold text-primary">{accuracy}%</span>
                  </td>
                  
                  {/* Date */}
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    {formatDate(attempt.attempted_at)}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      {isPassed ? (
                        <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <FaCheckCircle className="w-2.5 h-2.5 text-secondary" />
                          <span>Passed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-red-50 text-red-500 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <FaTimesCircle className="w-2.5 h-2.5 text-red-500" />
                          <span>Failed</span>
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => onViewDetails(attempt.id)}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary font-bold rounded-lg text-[10px] transition-all active:scale-95"
                      >
                        <FaEye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}