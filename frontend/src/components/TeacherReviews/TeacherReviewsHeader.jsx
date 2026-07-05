import React from 'react';
import { Link } from 'react-router-dom';
import { FaRedo, FaSpinner } from 'react-icons/fa';
export default function TeacherReviewsHeader({ onRefresh, loading = false }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-1">
        {/* Breadcrumb Links */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">STEMVerse LMS</Link>
          <span>/</span>
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">Teacher Dashboard</Link>
          <span>/</span>
          <span className="text-slate-455 font-black">Course Reviews</span>
        </div>
        {/* Heading */}
        <div className="space-y-0.5">
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            Course Reviews
          </h1>
          <p className="text-xs text-darkGray-light font-medium mt-1 leading-relaxed">
            View and monitor student feedback for your courses.
          </p>
        </div>
      </div>
      {/* Action Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className="self-start sm:self-auto inline-flex items-center justify-center space-x-2 py-3 px-5 border border-slate-200 hover:border-slate-355 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
      >
        {loading ? (
          <FaSpinner className="animate-spin w-3.5 h-3.5 text-primary" />
        ) : (
          <FaRedo className="w-3.5 h-3.5 text-slate-500" />
        )}
        <span>Refresh</span>
      </button>
    </div>
  );
}
