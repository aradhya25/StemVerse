import React from 'react';
export default function EmptyLessons() {
  return (
    <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto">
      {/* 📚 Emoji */}
      <span className="text-4xl mb-5 select-none" role="img" aria-label="Books">
        📚
      </span>
      <h3 className="text-base font-bold text-darkGray font-sans">
        No Lessons Available
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal mt-2 max-w-xs">
        This course does not contain any lessons yet.
      </p>
    </div>
  );
}
