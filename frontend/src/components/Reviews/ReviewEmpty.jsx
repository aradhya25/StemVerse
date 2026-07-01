import React from 'react';
export default function ReviewEmpty() {
  return (
    <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto">
      {/* ⭐ Icon */}
      <span className="text-4xl mb-5 select-none animate-pulse" role="img" aria-label="Star">
        ⭐
      </span>
      <h3 className="text-base font-bold text-darkGray font-sans">
        No Reviews Yet
      </h3>
      
      <p className="text-xs text-slate-400 font-normal mt-2 max-w-xs leading-relaxed">
        Be the first student to review this course. Share your feedback to guide others.
      </p>
    </div>
  );
}