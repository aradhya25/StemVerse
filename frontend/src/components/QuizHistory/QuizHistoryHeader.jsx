import React from 'react';
export default function QuizHistoryHeader() {
  return (
    <div className="space-y-1 pb-2 flex-shrink-0">
      <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
        Quiz History
      </h1>
      <p className="text-sm text-darkGray-light font-medium mt-1">
        Review all your quiz attempts and monitor your learning performance.
      </p>
    </div>
  );
}