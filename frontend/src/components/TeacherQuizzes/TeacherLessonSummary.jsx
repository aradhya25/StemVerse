import React from 'react';
import { FaCalendarAlt, FaBook, FaRegQuestionCircle } from 'react-icons/fa';
export default function TeacherLessonSummary({ lesson = {}, totalQuizzes = 0 }) {
  const { title, description, created_at } = lesson || {};
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-premium flex flex-col md:flex-row gap-5 items-stretch animate-fadeIn">
      {/* Lesson video placeholder frame */}
      <div className="w-full md:w-44 h-32 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative select-none">
        <span className="text-4xl">📖</span>
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center space-x-1 bg-slate-900/60 backdrop-blur-sm text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-slate-800/40">
          <FaBook className="w-2.5 h-2.5 text-primary mr-1" />
          <span>Lesson Module</span>
        </span>
      </div>
      {/* Details middle */}
      <div className="flex-1 flex flex-col justify-between min-w-0 space-y-3">
        <div className="space-y-1.5">
          <h2 className="text-lg font-black text-darkGray leading-tight">
            {title || 'Lesson Details'}
          </h2>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2">
            {description || 'No description provided.'}
          </p>
        </div>
        {/* Bottom stats row */}
        <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-450 pt-2 border-t border-slate-50">
          <div className="flex items-center space-x-1.5">
            <FaRegQuestionCircle className="w-3.5 h-3.5 text-primary" />
            <span>Total Quizzes: {totalQuizzes}</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center space-x-1.5">
            <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>Published: {formatDate(created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}