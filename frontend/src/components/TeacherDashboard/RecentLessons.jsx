import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaEdit, FaCalendarAlt } from 'react-icons/fa';
export default function RecentLessons({ lessons = [] }) {
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Recent Lessons
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Track and configure your newly published lesson lectures
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {lessons.slice(0, 4).map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-darkGray leading-tight line-clamp-1">
                    {lesson.title}
                  </h4>
                  <span className="text-[9px] font-bold text-slate-400 block line-clamp-1">
                    Course: {lesson.course_title || 'STEM Course'}
                  </span>
                </div>
                {/* Lesson number badge */}
                <span className="bg-emerald-50 text-secondary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                  Lesson {lesson.order_no || 1}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold">
                <FaCalendarAlt className="w-3 h-3 text-slate-350" />
                <span>Published: {formatDate(lesson.created_at)}</span>
              </div>
              <button
                onClick={() => navigate(`/teacher/lessons`)}
                className="inline-flex items-center space-x-1.5 bg-primary hover:bg-blue-750 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-sm shadow-primary/10 transition-all active:scale-95"
              >
                <FaEdit className="w-2.5 h-2.5" />
                <span>Edit Lesson</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}