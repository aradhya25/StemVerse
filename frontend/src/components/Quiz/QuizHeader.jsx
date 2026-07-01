import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
export default function QuizHeader({ title, description, lessonId }) {
  return (
    <div className="space-y-4 border-b border-slate-100 pb-6 flex-shrink-0">
      {/* Back button */}
      <Link
        to={`/dashboard/lesson/${lessonId}`}
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors"
      >
        <FaArrowLeft className="w-3 h-3" />
        <span>Back to Lesson</span>
      </Link>
      {/* Title & Description */}
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-darkGray tracking-tight leading-tight font-sans">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-darkGray-light font-normal leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}