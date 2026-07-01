import React from "react";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
export default function LessonNavigation({
  onPrev,
  onNext,
  onComplete,
  onQuiz,
  isFirst = false,
  isLast = false,
  isCompleted = false,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Prev / Next buttons */}
      <div className="flex items-center space-x-3.5 flex-1 sm:flex-initial">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 border border-slate-200 hover:border-slate-350 disabled:border-slate-100 disabled:opacity-50 text-darkGray-light disabled:text-slate-300 font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
        >
          <FaChevronLeft className="mr-2 w-3 h-3" />
          <span>Previous Lesson</span>
        </button>
        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isLast}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 border border-slate-200 hover:border-slate-350 disabled:border-slate-100 disabled:opacity-50 text-darkGray-light disabled:text-slate-300 font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
        >
          <span>Next Lesson</span>
          <FaChevronRight className="ml-2 w-3 h-3" />
        </button>
      </div>
      {/* Completion Button */}
      <button
        onClick={onComplete}
        className={`py-3.5 px-6 font-extrabold rounded-xl shadow-md text-xs transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 ${
          isCompleted
            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/10"
            : "bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-primary/10"
        }`}
      >
        <FaCheckCircle className="w-3.5 h-3.5" />
        <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
      </button>
      {/* <button
        onClick={onQuiz}
        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Take Quiz
      </button> */}
      <button
        onClick={onQuiz}
        disabled={!isCompleted}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
    ${
      isCompleted
        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
        : "bg-gray-200 text-gray-500 cursor-not-allowed"
    }`}
      >
        Take Quiz
      </button>
    </div>
  );
}
