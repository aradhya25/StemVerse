import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaLanguage, FaCalendarAlt } from "react-icons/fa";
export default function RecentCourses({ courses = [] }) {
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Recent Courses
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Manage your newly compiled curriculum directories
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {courses.slice(0, 4).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch"
          >
            {/* Thumbnail Placeholder */}
            <div className="w-full sm:w-28 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 flex-shrink-0 flex items-center justify-center border border-slate-100/50 overflow-hidden relative group">
              {course.thumbnail ? (
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
              ) : (
                <span className="text-3xl">📚</span>
              )}
            </div>
            {/* Details Content */}
            <div className="flex-1 flex flex-col justify-between min-w-0 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2.5">
                  <h4 className="text-xs font-extrabold text-darkGray truncate">
                    {course.title}
                  </h4>

                  {/* Language Badge */}
                  <span className="inline-flex items-center space-x-1 bg-blue-50 text-primary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                    <FaLanguage className="w-2.5 h-2.5" />
                    <span>{course.language || "English"}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold">
                  <FaCalendarAlt className="w-3 h-3 text-slate-350" />
                  <span>Created: {formatDate(course.created_at)}</span>
                </div>
              </div>
              {/* Action triggers */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => navigate(`/teacher/courses`)}
                  className="inline-flex items-center space-x-1.5 border border-slate-200 hover:border-slate-350 text-darkGray hover:text-primary text-[10px] font-bold px-3.5 py-1.5 rounded-xl transition-all"
                >
                  <FaEdit className="w-2.5 h-2.5" />
                  <span>Manage</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
