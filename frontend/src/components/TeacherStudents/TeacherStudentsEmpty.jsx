import React from 'react';
export default function TeacherStudentsEmpty() {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fadeIn">
      {/* 🧑‍🎓 Icon */}
      <span className="text-5xl mb-6 select-none animate-bounce" role="img" aria-label="No students indicator">
        🧑‍🎓
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No Students Found
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        Students will appear here once they enroll in your courses. Monitor details once student registrations start.
      </p>
    </div>
  );
}
