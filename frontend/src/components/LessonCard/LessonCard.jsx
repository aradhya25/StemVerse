import React from 'react';
import { FaPlayCircle, FaRegClock } from 'react-icons/fa';
export default function LessonCard({ lesson, index, onViewLesson }) {
  const { id, title, duration, order_no } = lesson;
  // Format Order Number: pad with leading zero (e.g. 01, 02)
  const formatOrderNo = (num) => {
    if (num === undefined || num === null) return `0${index + 1}`;
    return num < 10 ? `0${num}` : num;
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-premium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-6 group">
      
      {/* Play Icon and Info */}
      <div className="flex items-center space-x-4 min-w-0">
        {/* Play Circle Icon */}
        <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary rounded-xl transition-colors flex-shrink-0">
          <FaPlayCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1 min-w-0">
          {/* Order Badge & Title */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Lesson {formatOrderNo(order_no)}
            </span>
            <span className="text-[10px] text-slate-400 font-bold flex items-center space-x-1">
              <FaRegClock className="w-3 h-3" />
              <span>{duration} mins</span>
            </span>
          </div>
          <h4 className="text-sm font-bold text-darkGray truncate leading-tight group-hover:text-primary transition-colors">
            {title}
          </h4>
        </div>
      </div>
      {/* Action View Button */}
      <button
        onClick={() => onViewLesson(id)}
        className="px-4 py-2 border border-slate-200 hover:border-primary text-darkGray-light hover:text-primary font-bold rounded-lg text-xs transition-all active:scale-95 flex-shrink-0"
      >
        View Lesson
      </button>
    </div>
  );
}
