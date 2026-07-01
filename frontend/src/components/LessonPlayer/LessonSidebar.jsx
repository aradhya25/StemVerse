import React from 'react';
import { FaPlay, FaCheckCircle, FaGraduationCap } from 'react-icons/fa';
export default function LessonSidebar({ lessons = [], currentLessonId, onSelectLesson }) {
  
  // Format index helpers
  const formatIndex = (num) => {
    return num < 10 ? `0${num}` : num;
  };
  // Sort lessons sequentially
  const sorted = [...lessons].sort((a, b) => (a.order_no || 0) - (b.order_no || 0));
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium space-y-6 flex flex-col h-full">
      <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
        <div className="bg-primary/10 p-2 rounded-xl text-primary flex-shrink-0">
          <FaGraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-darkGray font-sans">Course Content</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {lessons.length} Modules Total
          </span>
        </div>
      </div>
      {/* Lesson Navigation stack */}
      <div className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1.5 flex-1">
        {sorted.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full flex items-start text-left p-3.5 rounded-2xl border transition-all duration-200 group relative ${
                isCurrent
                  ? 'border-primary bg-blue-50/50 shadow-sm ring-2 ring-primary/10'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              {/* Play / Completion Icon */}
              <div className="flex items-start space-x-3.5 min-w-0 flex-1">
                <span className={`text-[10px] font-extrabold uppercase mt-1 flex-shrink-0 ${
                  isCurrent ? 'text-primary' : 'text-slate-400'
                }`}>
                  {formatIndex(lesson.order_no)}
                </span>
                
                <div className="min-w-0">
                  <h4 className={`text-xs font-bold leading-snug truncate ${
                    isCurrent ? 'text-primary' : 'text-darkGray group-hover:text-primary transition-colors'
                  }`}>
                    {lesson.title}
                  </h4>
                </div>
              </div>
              {/* Indicator Dot */}
              {isCurrent && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary">
                  <FaPlay className="w-2.5 h-2.5 animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
