import React from "react";
import { FaPlay, FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
export default function CourseHero({ course, onStartLearning }) {
  const { title, description, language, thumbnail, created_at } = course || {};
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Thumbnail and Badges */}
        <div className="lg:col-span-5 relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-md">
          {thumbnail ? (
            <img
              src={
                course.thumbnail
                  ? `http://localhost:5000${course.thumbnail}`
                  : "/placeholder-course.png"
              }
              alt={course.title}
              onError={(e) => {
                e.target.src = "/placeholder-course.png";
              }}
            />
          ) : null}
          {/* Fallback Graphic */}
          <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex-col items-center justify-center p-4">
            <FaGraduationCap className="w-16 h-16 text-primary-light animate-pulse" />
          </div>
          {/* Floating Language Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-primary/95 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {language}
            </span>
          </div>
        </div>
        {/* Right Column: Title and Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-darkGray tracking-tight leading-tight font-sans">
              {title}
            </h1>
            <p className="text-sm text-darkGray-light leading-relaxed font-normal">
              {description}
            </p>
          </div>
          {/* Created Date */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold">
            <FaCalendarAlt className="w-4 h-4 text-slate-300" />
            <span>Created on {formatDate(created_at)}</span>
          </div>
          {/* Start Learning Action Button */}
          <button
            onClick={onStartLearning}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-extrabold text-white bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaPlay className="mr-2.5 w-3 h-3" />
            <span>Start Learning</span>
          </button>
        </div>
      </div>
    </div>
  );
}
