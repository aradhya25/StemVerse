import React from 'react';
export default function TeacherReviewsEmpty() {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fadeIn">
      {/* ⭐️ Icon */}
      <span className="text-5xl mb-6 select-none animate-bounce" role="img" aria-label="No reviews indicator">
        ⭐️
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No Reviews Yet
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Student reviews will appear here after they submit feedback. Track feedback here once student reviews start posting.
      </p>
    </div>
  );
}
