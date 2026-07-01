import React from 'react';
import { FaGraduationCap, FaTrophy } from 'react-icons/fa';
export default function TopCourses({ courses = [] }) {
  
  // Sort by students enrolled descending
  const sortedCourses = [...courses].sort((a, b) => (b.students_count || 0) - (a.students_count || 0));
  const getRankBadge = (index) => {
    const badges = [
      { bg: 'bg-yellow-50 border-yellow-200 text-yellow-600', label: 'Gold #1' },
      { bg: 'bg-slate-100 border-slate-200 text-slate-500', label: 'Silver #2' },
      { bg: 'bg-amber-50 border-amber-200 text-amber-700', label: 'Bronze #3' }
    ];
    if (index < 3) {
      return (
        <span className={`inline-flex items-center space-x-1 border px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${badges[index].bg}`}>
          <FaTrophy className="w-2.5 h-2.5" />
          <span>{badges[index].label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 bg-slate-50 border border-slate-150 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
        <span>Rank #{index + 1}</span>
      </span>
    );
  };
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Top Courses
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Highest enrolled academic curricula
        </p>
      </div>
      <div className="space-y-3.5 animate-fadeIn">
        {sortedCourses.slice(0, 5).map((course, index) => (
          <div
            key={course.id || index}
            className="bg-white rounded-2xl border border-slate-100 p-4.5 shadow-premium flex items-center justify-between transition-all duration-300 hover:shadow-md"
          >
            <div className="space-y-1 pr-4 min-w-0">
              <h4 className="text-xs font-extrabold text-darkGray truncate">
                {course.title}
              </h4>
              
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold">
                <FaGraduationCap className="w-3.5 h-3.5 text-slate-350" />
                <span>{course.students_count || 0} enrolled students</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              {getRankBadge(index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
