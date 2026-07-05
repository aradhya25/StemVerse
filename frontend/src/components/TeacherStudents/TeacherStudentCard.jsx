import React from 'react';
import { FaEye, FaGraduationCap, FaClipboardList, FaFileAlt, FaBookOpen } from 'react-icons/fa';
export default function TeacherStudentCard({ student = {}, onViewDetails }) {
  
  const getScoreBadgeStyle = (score) => {
    const numScore = parseFloat(score) || 0;
    if (numScore >= 80) {
      return "bg-emerald-50 text-secondary border-emerald-100/50";
    }
    if (numScore >= 60) {
      return "bg-blue-50 text-primary border-blue-100/50";
    }
    if (numScore >= 40) {
      return "bg-yellow-50 text-yellow-600 border-yellow-100/50";
    }
    return "bg-red-50 text-red-500 border-red-100/50";
  };
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'ST';
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 md:hidden animate-fadeIn">
      
      <div className="space-y-3">
        {/* Header row: Avatar initials, name details, average score badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-200/50 flex items-center justify-center text-[10px] font-black text-primary flex-shrink-0 select-none">
              {getInitials(student.name)}
            </div>
            
            <div className="min-w-0 leading-tight">
              <h4 className="text-xs font-bold text-darkGray truncate">
                {student.name || 'Anonymous Student'}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                {student.email || '—'}
              </p>
            </div>
          </div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border shadow-sm leading-none flex-shrink-0 ${getScoreBadgeStyle(student.average_score)}`}>
            {parseFloat(student.average_score || 0).toFixed(1)}%
          </span>
        </div>
        {/* Info Grid metrics */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-50 text-[9px] font-bold text-slate-450 text-center">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FaBookOpen className="w-3.5 h-3.5 text-slate-350" />
            <span>{student.enrolled_courses || 0} Courses</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 border-x border-slate-50">
            <FaFileAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>{student.completed_lessons || 0} Lessons</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <FaClipboardList className="w-3.5 h-3.5 text-slate-350" />
            <span>{student.quiz_attempts || 0} Quizzes</span>
          </div>
        </div>
      </div>
      {/* View Details Action Button */}
      <button
        onClick={() => onViewDetails(student)}
        className="w-full py-2.5 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-sm flex items-center justify-center space-x-1.5 active:scale-95 bg-white"
      >
        <FaEye className="w-3.5 h-3.5" />
        <span>View Details</span>
      </button>
    </div>
  );
}
