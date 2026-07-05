import React from 'react';
import { Link } from 'react-router-dom';
import { FaSave, FaSpinner } from 'react-icons/fa';
export default function EditCourseHeader({ loading = false, onSubmit }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-1">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
          <Link to="/teacher/dashboard" className="hover:text-primary transition-colors">Teacher Dashboard</Link>
          <span>/</span>
          <Link to="/teacher/courses" className="hover:text-primary transition-colors">My Courses</Link>
          <span>/</span>
          <span className="text-slate-455 font-black">Edit Course</span>
        </div>
        {/* Heading */}
        <div className="space-y-0.5">
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            Edit Course
          </h1>
          <p className="text-xs text-darkGray-light font-medium mt-1 leading-relaxed">
            Update course information and thumbnail.
          </p>
        </div>
      </div>
      {/* Action Save Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin w-3.5 h-3.5" />
            <span>Saving Changes...</span>
          </>
        ) : (
          <>
            <FaSave className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </>
        )}
      </button>
    </div>
  );
}
