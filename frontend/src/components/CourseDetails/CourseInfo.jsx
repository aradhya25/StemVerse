import React from 'react';
import { FaGlobe, FaCalendarAlt, FaFingerprint } from 'react-icons/fa';
export default function CourseInfo({ course }) {
  const { id, language, created_at } = course || {};
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
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-premium grid grid-cols-1 sm:grid-cols-3 gap-6">
      
      {/* Language Info */}
      <div className="flex items-center space-x-4 p-2">
        <div className="p-3 bg-blue-50 text-primary rounded-2xl flex-shrink-0">
          <FaGlobe className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Language</span>
          <p className="text-sm font-extrabold text-darkGray">{language || 'English'}</p>
        </div>
      </div>
      {/* Date Info */}
      <div className="flex items-center space-x-4 p-2">
        <div className="p-3 bg-green-50 text-secondary rounded-2xl flex-shrink-0">
          <FaCalendarAlt className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Release Date</span>
          <p className="text-sm font-extrabold text-darkGray">{formatDate(created_at)}</p>
        </div>
      </div>
      {/* ID Info */}
      <div className="flex items-center space-x-4 p-2">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl flex-shrink-0">
          <FaFingerprint className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Course Reference</span>
          <p className="text-xs font-extrabold text-darkGray truncate">{id}</p>
        </div>
      </div>
    </div>
  );
}
