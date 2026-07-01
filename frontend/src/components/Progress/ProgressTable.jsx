import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaRegClock } from 'react-icons/fa';
export default function ProgressTable({ progress = [] }) {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="py-4.5 px-6">Lesson Name</th>
              <th className="py-4.5 px-6 text-center">Watch Time</th>
              <th className="py-4.5 px-6 text-center">Status</th>
              <th className="py-4.5 px-6">Completed At</th>
              <th className="py-4.5 px-6">Course Name</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
            {progress.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-slate-50/30 transition-colors"
              >
                {/* Lesson ID (Prepared for future lesson names, shows small code text now) */}
                <td className="py-4 px-6 font-mono text-slate-500 font-bold select-all truncate max-w-[160px]">
                  {item.lesson_title}
                </td>
                
                
                {/* Watch Time */}
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center space-x-1 font-bold text-darkGray">
                    <FaRegClock className="w-3.5 h-3.5 text-slate-350 mr-1" />
                    <span>{item.watch_time || 0} min</span>
                  </span>
                </td>
                
                {/* Status Badge */}
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center">
                    {item.completed ? (
                      <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <FaCheckCircle className="w-2.5 h-2.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-slate-100 text-slate-455 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <FaHourglassHalf className="w-2.5 h-2.5" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>
                </td>
                
                {/* Completed Date */}
                <td className="py-4 px-6 text-slate-400 font-medium">
                  {formatDate(item.completed_at)}
                </td>
                <td className="text-xs text-slate-500">
                  {item.course_title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
