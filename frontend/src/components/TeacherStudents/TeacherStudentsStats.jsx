import React from 'react';
import { FaGraduationCap, FaClipboardList, FaFileAlt, FaUsers } from 'react-icons/fa';
export default function TeacherStudentsStats({ students = [] }) {
  const totalStudents = students.length;
  
  const avgScore = totalStudents > 0
    ? (students.reduce((acc, s) => acc + (parseFloat(s.average_score) || 0), 0) / totalStudents).toFixed(1)
    : '0.0';
  const totalAttempts = students.reduce((acc, s) => acc + (parseInt(s.quiz_attempts) || 0), 0);
  const completedLessons = students.reduce((acc, s) => acc + (parseInt(s.completed_lessons) || 0), 0);
  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: <FaUsers className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/50 border-blue-100/50"
    },
    {
      label: "Average Score",
      value: `${avgScore}%`,
      icon: <FaGraduationCap className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50/50 border-purple-100/50"
    },
    {
      label: "Total Quiz Attempts",
      value: totalAttempts,
      icon: <FaClipboardList className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/50 border-emerald-100/50"
    },
    {
      label: "Completed Lessons",
      value: completedLessons,
      icon: <FaFileAlt className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50/50 border-indigo-100/50"
    }
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`border p-4.5 rounded-2xl flex items-center space-x-3.5 shadow-sm bg-white hover:shadow-md transition-all duration-300 ${stat.bg}`}
        >
          <div className="p-2.5 bg-white border border-slate-100/80 rounded-xl shadow-sm">
            {stat.icon}
          </div>
          <div className="leading-tight">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              {stat.label}
            </span>
            <p className="text-lg font-black text-darkGray mt-0.5 leading-none">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
