import React from 'react';
import { FaStar, FaRegStar, FaEye } from 'react-icons/fa';
export default function TeacherReviewsTable({ reviews = [], onViewDetails }) {
  
  const renderStars = (rating = 0) => {
    const stars = [];
    const numRating = parseInt(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={i} className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />);
      } else {
        stars.push(<FaRegStar key={i} className="w-3.5 h-3.5 text-slate-200 flex-shrink-0" />);
      }
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden animate-fadeIn hidden md:block">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          
          {/* Table Headers */}
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FAFC]/50 text-[10px] font-black uppercase text-slate-400 tracking-wider select-none">
              <th className="py-4.5 px-6">Student</th>
              <th className="py-4.5 px-6">Course</th>
              <th className="py-4.5 px-6">Rating</th>
              <th className="py-4.5 px-6">Review</th>
              <th className="py-4.5 px-6">Date</th>
              <th className="py-4.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
            {reviews.map((rev) => (
              <tr
                key={rev.id}
                className="hover:bg-slate-50/50 transition-colors duration-150 group"
              >
                {/* Student Name */}
                <td className="py-4 px-6 font-bold text-darkGray truncate max-w-[150px]">
                  {rev.student_name || 'Anonymous Student'}
                </td>
                {/* Course Title */}
                <td className="py-4 px-6 font-medium text-slate-600 truncate max-w-[180px]">
                  {rev.course_title || '—'}
                </td>
                {/* Stars Rating */}
                <td className="py-4 px-6">
                  {renderStars(rev.rating)}
                </td>
                {/* Review Text */}
                <td className="py-4 px-6 text-slate-500 font-medium truncate max-w-[280px]">
                  {rev.review || '—'}
                </td>
                {/* Review Date */}
                <td className="py-4 px-6 text-slate-400 font-medium">
                  {formatDate(rev.created_at)}
                </td>
                {/* Action View Button */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onViewDetails(rev)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-sm active:scale-95 bg-white"
                  >
                    <FaEye className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
