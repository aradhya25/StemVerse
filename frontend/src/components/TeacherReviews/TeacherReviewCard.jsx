import React from 'react';
import { FaStar, FaRegStar, FaEye } from 'react-icons/fa';
export default function TeacherReviewCard({ review = {}, onViewDetails }) {
  
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
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 md:hidden animate-fadeIn">
      
      <div className="space-y-3">
        {/* Header row: Student, Course, Rating */}
        <div className="flex justify-between items-start gap-2.5">
          <div className="leading-tight min-w-0">
            <h4 className="text-xs font-bold text-darkGray truncate">
              {review.student_name || 'Anonymous Student'}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
              Course: {review.course_title || '—'}
            </p>
          </div>
          {renderStars(review.rating)}
        </div>
        {/* Review snippet text */}
        <p className="text-xs font-medium text-slate-500 line-clamp-3 leading-relaxed">
          {review.review || '—'}
        </p>
        {/* Review Date stamp footer */}
        <div className="text-[9px] font-bold text-slate-400 border-t border-slate-50 pt-2 flex items-center justify-between">
          <span>Submitted on</span>
          <span>{formatDate(review.created_at)}</span>
        </div>
      </div>
      {/* Details Trigger Button */}
      <button
        onClick={() => onViewDetails(review)}
        className="w-full py-2.5 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-xl text-[10px] font-extrabold uppercase tracking-wide transition-all shadow-sm flex items-center justify-center space-x-1.5 active:scale-95 bg-white"
      >
        <FaEye className="w-3.5 h-3.5" />
        <span>View Details</span>
      </button>
    </div>
  );
}