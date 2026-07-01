import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
export default function ReviewSummary({ averageRating = 0, totalReviews = 0 }) {
  
  const ratingVal = parseFloat(averageRating) || 0;
  // Star Generator Helper
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="w-5 h-5 text-slate-200" />);
      }
    }
    return stars;
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium flex flex-col sm:flex-row items-center justify-between gap-6">
      
      {/* Aggregate Score details */}
      <div className="flex items-center space-x-6 text-center sm:text-left">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Rating</span>
          <div className="flex items-baseline justify-center sm:justify-start space-x-1.5">
            <h2 className="text-4xl font-black text-darkGray font-sans leading-none">
              {ratingVal.toFixed(1)}
            </h2>
            <span className="text-xs text-slate-400 font-bold">/ 5.0</span>
          </div>
        </div>
        <div className="h-10 w-px bg-slate-100 hidden sm:block" />
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Reviews</span>
          <p className="text-lg font-black text-darkGray leading-none">
            {totalReviews} <span className="text-xs font-bold text-slate-455">Reviews</span>
          </p>
        </div>
      </div>
      {/* Visual Stars */}
      <div className="flex flex-col items-center sm:items-end space-y-1">
        <div className="flex items-center space-x-1.5">
          {renderStars(ratingVal)}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Student Feedback
        </span>
      </div>
    </div>
  );
}
