import React from 'react';
import { FaBook, FaUserGraduate, FaBookOpen, FaRegQuestionCircle } from 'react-icons/fa';
export default function TeacherCourseStats({ courses = [] }) {
  
  const totalCourses = courses.length;

const totalStudents = courses.reduce(
  (sum, c) => sum + Number(c.students_count || 0),
  0
);

const totalLessons = courses.reduce(
  (sum, c) => sum + Number(c.lessons_count || 0),
  0
);

const totalQuizzes = courses.reduce(
  (sum, c) => sum + Number(c.quizzes_count || 0),
  0
);
  const stats = [
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: <FaBook className="w-5 h-5 text-primary" />,
      bg: 'bg-blue-50/70',
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <FaUserGraduate className="w-5 h-5 text-yellow-600" />,
      bg: 'bg-yellow-50/70',
    },
    {
      title: 'Total Lessons',
      value: totalLessons,
      icon: <FaBookOpen className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-green-50/70',
    },
    {
      title: 'Total Quizzes',
      value: totalQuizzes,
      icon: <FaRegQuestionCircle className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50/70',
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {stat.title}
            </span>
            <p className="text-2xl font-black text-darkGray leading-none">
              {stat.value}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl ${stat.bg} transition-transform duration-300 group-hover:scale-105`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}