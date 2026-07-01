import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaBook,
  FaRegQuestionCircle,
  FaLanguage,
  FaCalendarAlt,
  FaEdit,
  FaBookOpen,
  FaStar,
  FaTrash,
} from "react-icons/fa";
export default function TeacherCourseCard({ course, onDeleteInit }) {
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fadeIn">
      <div className="space-y-4">
        {/* Course Thumbnail or Gradient Placeholder */}
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-100 overflow-hidden relative flex items-center justify-center flex-shrink-0">
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
            <span className="text-5xl select-none animate-pulse">📚</span>
          )}
          {/* Language Badge */}
          <span className="absolute top-3 right-3 inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-primary text-[8px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100/50">
            <FaLanguage className="w-3 h-3" />
            <span>{course.language || "English"}</span>
          </span>
        </div>
        {/* Course details */}
        <div className="space-y-2">
          <h4 className="text-base font-extrabold text-darkGray line-clamp-1 leading-tight group-hover:text-primary transition-colors">
            {course.title}
          </h4>

          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {course.description}
          </p>
        </div>
        {/* Statistics Row */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-50 text-[10px] font-bold text-slate-450">
          <div className="flex items-center space-x-1.5 justify-center">
            <FaGraduationCap className="w-3.5 h-3.5 text-slate-350" />
            <span>{course.students_count || 0} Students</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-center border-x border-slate-50">
            <FaBook className="w-3.5 h-3.5 text-slate-350" />
            <span>{course.lessons_count || 0} Lessons</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-center">
            <FaRegQuestionCircle className="w-3.5 h-3.5 text-slate-350" />
            <span>{course.quizzes_count || 0} Quizzes</span>
          </div>
        </div>
        {/* Date Published */}
        <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold justify-start pt-1">
          <FaCalendarAlt className="w-3 h-3 text-slate-350" />
          <span>Published: {formatDate(course.created_at)}</span>
        </div>
      </div>
      {/* Action Buttons row (4 equal buttons) */}
      <div className="grid grid-cols-4 gap-2 mt-5 pt-3 border-t border-slate-50">
        {/* Edit */}
        <button
          onClick={() => navigate(`/teacher/course/edit/${course.id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-primary rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Edit Details"
        >
          <FaEdit className="w-3.5 h-3.5 mb-1" />
          <span>Edit</span>
        </button>
        {/* Lessons */}
        <button
          onClick={() => navigate(`/teacher/course/${course.id}/lessons`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-emerald-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Manage Lessons"
        >
          <FaBookOpen className="w-3.5 h-3.5 mb-1" />
          <span>Lessons</span>
        </button>
        {/* Reviews */}
        <button
          onClick={() => navigate(`/teacher/course/${course.id}/reviews`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-300 text-darkGray-light hover:text-yellow-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="View Reviews"
        >
          <FaStar className="w-3.5 h-3.5 mb-1" />
          <span>Reviews</span>
        </button>
        {/* Delete */}
        <button
          onClick={() => onDeleteInit(course)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-red-200 text-darkGray-light hover:text-red-500 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Delete Course"
        >
          <FaTrash className="w-3.5 h-3.5 mb-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
