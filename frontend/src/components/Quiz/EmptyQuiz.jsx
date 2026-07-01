import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
export default function EmptyQuiz({ lessonId }) {
  return (
    <div className="bg-white rounded-3xl p-12 md:p-16 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center max-w-md mx-auto">
      {/* 📚 Emoji */}
      <span className="text-5xl mb-6 select-none" role="img" aria-label="Books">
        📚
      </span>
      <h3 className="text-lg font-bold text-darkGray font-sans">
        No Quiz Available
      </h3>
      
      <p className="text-xs text-darkGray-light font-normal leading-relaxed mt-2 max-w-xs">
        No quiz available for this lesson. Check back later or continue to the next chapter.
      </p>
      {/* Back button */}
      <Link
        to={`/student/lesson/${lessonId}`}
        className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all active:scale-95 space-x-2"
      >
        <FaArrowLeft className="w-3 h-3" />
        <span>Back to Lesson</span>
      </Link>
    </div>
  );
}