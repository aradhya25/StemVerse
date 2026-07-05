import React from 'react';
import { FaEye } from 'react-icons/fa';
export default function TeacherStudentsTable({ students = [], onViewDetails }) {
  
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
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden animate-fadeIn hidden md:block">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          
          {/* Table Headers */}
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FAFC]/50 text-[10px] font-black uppercase text-slate-400 tracking-wider select-none">
              <th className="py-4.5 px-6 w-16">Avatar</th>
              <th className="py-4.5 px-6">Student Name</th>
              <th className="py-4.5 px-6">Email</th>
              <th className="py-4.5 px-6 text-center">Courses</th>
              <th className="py-4.5 px-6 text-center">Lessons</th>
              <th className="py-4.5 px-6 text-center">Quiz Attempts</th>
              <th className="py-4.5 px-6 text-center">Average Score</th>
              <th className="py-4.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-50/50 transition-colors duration-150 group"
              >
                {/* Avatar Initials */}
                <td className="py-4 px-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-200/50 flex items-center justify-center text-[10px] font-black text-primary select-none">
                    {getInitials(student.name)}
                  </div>
                </td>
                {/* Student Name */}
                <td className="py-4 px-6 font-bold text-darkGray truncate max-w-[150px]">
                  {student.name || 'Anonymous Student'}
                </td>
                {/* Student Email */}
                <td className="py-4 px-6 text-slate-500 font-medium truncate max-w-[150px]">
                  {student.email || '—'}
                </td>
                {/* Courses Enrolled */}
                <td className="py-4 px-6 text-center font-extrabold text-slate-600">
                  {student.enrolled_courses || 0}
                </td>
                {/* Completed Lessons */}
                <td className="py-4 px-6 text-center font-extrabold text-slate-650 text-slate-500">
                  {student.completed_lessons || 0}
                </td>
                {/* Quiz Attempts */}
                <td className="py-4 px-6 text-center font-extrabold text-slate-500">
                  {student.quiz_attempts || 0}
                </td>
                {/* Average Score Badge */}
                <td className="py-4 px-6 text-center">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border shadow-sm leading-none ${getScoreBadgeStyle(student.average_score)}`}>
                    {parseFloat(student.average_score || 0).toFixed(1)}%
                  </span>
                </td>
                {/* Action View button */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-sm active:scale-95 bg-white"
                  >
                    <FaEye className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}