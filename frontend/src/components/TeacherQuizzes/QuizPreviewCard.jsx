import React from 'react';
import { FaHourglassHalf, FaListOl, FaRegClock, FaGraduationCap, FaCalendarAlt, FaRegEye } from 'react-icons/fa';
export default function QuizPreviewCard({
  title,
  description,
  lessonName = 'Parent Lesson',
  timeLimit,
  passingScore
}) {
  return (
    <div className="space-y-4">
      {/* Live Preview Label */}
      <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider select-none">
        <FaRegEye className="w-3.5 h-3.5" />
        <span>Live Preview</span>
      </div>
      {/* Premium Card Container */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[340px] animate-fadeIn">
        
        <div className="space-y-3">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider max-w-[120px] truncate">
              {lessonName}
            </span>
            {/* Status draft badge */}
            <span className="inline-flex items-center space-x-1 bg-slate-100 text-slate-455 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <FaHourglassHalf className="w-2.5 h-2.5" />
              <span>Draft</span>
            </span>
          </div>
          {/* Title & Description */}
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-darkGray leading-tight line-clamp-1">
              {title || 'Untitled Quiz'}
            </h4>
            <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {description || 'Write a quiz description to preview it here.'}
            </p>
          </div>
          {/* Middle Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-50 text-[10px] font-bold text-slate-450 text-center">
            <div className="flex flex-col items-center justify-center space-y-1">
              <FaListOl className="w-3.5 h-3.5 text-slate-355 text-slate-350" />
              <span>0 Qs</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 border-x border-slate-50">
              <FaRegClock className="w-3.5 h-3.5 text-slate-350" />
              <span>{timeLimit || 0} Mins</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <FaGraduationCap className="w-3.5 h-3.5 text-slate-350" />
              <span>Pass: {passingScore || 60}%</span>
            </div>
          </div>
          {/* Created Date */}
          <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold justify-start pt-1">
            <FaCalendarAlt className="w-3 h-3 text-slate-350" />
            <span>Created: Today</span>
          </div>
        </div>
        {/* Footer info */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span className="uppercase text-[9px] tracking-wide text-slate-400 font-black">Draft Preview</span>
        </div>
      </div>
    </div>
  );
}
