import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
export default function CreateCourseHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-50 animate-fadeIn">
      <div className="space-y-0.5">
        <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
          Create New Course
        </h1>
        <p className="text-sm text-darkGray-light font-medium mt-1 leading-relaxed">
          Create a professional course and start teaching students.
        </p>
      </div>
      <Link
        to="/teacher/courses"
        className="inline-flex items-center space-x-2 text-xs font-bold text-darkGray hover:text-primary transition-all self-start sm:self-auto"
      >
        <FaArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Courses</span>
      </Link>
    </div>
  );
}