import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
export default function ReviewForm({ onSubmit, editReview = null, onCancelEdit }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  // Sync state if editReview payload is loaded
  useEffect(() => {
    if (editReview) {
      setRating(editReview.rating || 5);
      setReview(editReview.review || '');
    } else {
      setRating(5);
      setReview('');
    }
  }, [editReview]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) return;
    onSubmit({ rating, review });
    // Reset if not editing
    if (!editReview) {
      setRating(5);
      setReview('');
    }
  };
  const charLimit = 500;
  const charsRemaining = charLimit - review.length;
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          {editReview ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Share your learning experience with other students
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Star Selector */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rating</span>
          <div className="flex items-center space-x-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform active:scale-110"
                >
                  <FaStar 
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-yellow-500' : 'text-slate-200'
                    }`} 
                  />
                </button>
              );
            })}
          </div>
        </div>
        {/* Review Textarea */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Review Message</span>
            <span className={charsRemaining < 50 ? 'text-red-500 font-bold' : 'text-slate-400'}>
              {charsRemaining} characters left
            </span>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, charLimit))}
            placeholder="Share your learning experience..."
            rows="4"
            className="w-full p-4.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white resize-none"
          />
        </div>
        {/* Submit triggers row */}
        <div className="flex items-center space-x-3.5 justify-end">
          {editReview && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="py-3 px-5 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            disabled={!review.trim()}
            className="py-3.5 px-6 bg-gradient-to-r from-primary to-blue-750 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {editReview ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}