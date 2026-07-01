import React from 'react';
export default function EmptyCourses() {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-lg mx-auto">
      {/* 📚 Emoji Display */}
      <span className="text-5xl mb-6 select-none" role="img" aria-label="Books">
        📚
      </span>
      <h3 className="text-xl font-bold text-darkGray font-sans">
        No Courses Available
      </h3>
      
      <p className="text-sm text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Courses will appear here once they are created.
      </p>
    </div>
  );
}
