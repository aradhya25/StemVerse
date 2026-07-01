import React from 'react';
import { FaBook, FaBookOpen, FaRegQuestionCircle, FaUserGraduate, FaCheckCircle } from 'react-icons/fa';
export default function TeacherStats({ dashboard }) {
  const { 
    total_courses = 0, 
    total_lessons = 0, 
    total_quizzes = 0, 
    total_students = 0, 
    completed_lessons = 0 
  } = dashboard || {};
  const statCards = [
    {
      title: 'My Courses',
      count: total_courses,
      desc: 'Active course catalogs',
      icon: <FaBook className="w-5 h-5 text-primary" />,
      bg: 'bg-blue-50/70',
    },
    {
      title: 'Lessons',
      count: total_lessons,
      desc: 'Compiled class modules',
      icon: <FaBookOpen className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-green-50/70',
    },
    {
      title: 'Quizzes',
      count: total_quizzes,
      desc: 'Syllabus assessments',
      icon: <FaRegQuestionCircle className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50/70',
    },
    {
      title: 'Students',
      count: total_students,
      desc: 'Enrolled platform learners',
      icon: <FaUserGraduate className="w-5 h-5 text-yellow-600" />,
      bg: 'bg-yellow-50/70',
    },
    {
      title: 'Completed Lessons',
      count: completed_lessons,
      desc: 'Completed student tasks',
      icon: <FaCheckCircle className="w-5 h-5 text-indigo-650" />,
      bg: 'bg-indigo-50/70',
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-fadeIn">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {card.title}
            </span>
            <p className="text-2xl font-black text-darkGray leading-none">
              {card.count}
            </p>
            <p className="text-[10px] text-slate-450 font-semibold group-hover:text-primary transition-colors mt-1">
              {card.desc}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-105`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
