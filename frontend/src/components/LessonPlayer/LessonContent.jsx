import React from 'react';
import { FaCalendarAlt, FaBrain } from 'react-icons/fa';
export default function LessonContent({ lesson }) {
  const { title, content, order_no, created_at } = lesson || {};
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };
  const formatOrderNo = (num) => {
    if (num === undefined || num === null) return '';
    return num < 10 ? `0${num}` : num;
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      
      {/* Meta details Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
            <FaBrain className="w-3 h-3 text-primary-light" />
            <span>Module {formatOrderNo(order_no)}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-darkGray tracking-tight leading-snug">
            {title}
          </h2>
        </div>
        {/* Created Date */}
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-bold self-start sm:self-auto">
          <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
          <span>Released: {formatDate(created_at)}</span>
        </div>
      </div>
      {/* Content description */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-darkGray uppercase tracking-wider">About This Lesson</h4>
        <p className="text-sm text-darkGray-light font-normal leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
