import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHourglassHalf, FaListOl, FaRegClock, FaGraduationCap, FaCalendarAlt, FaEdit, FaQuestionCircle, FaPlayCircle, FaTrash } from 'react-icons/fa';
export default function TeacherQuizCard({ quiz, index, onDeleteInit }) {
  const navigate = useNavigate();
  const { id, title, description, questions_count = 0, time_limit = 15, passing_score = 70, status, created_at } = quiz || {};
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 animate-fadeIn">
      
      <div className="space-y-3">
        {/* Header: Quiz number & status badge */}
        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Quiz {index + 1}
          </span>
          {status === 'published' || !status ? (
            <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <FaCheckCircle className="w-2 h-2" />
              <span>Published</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 bg-slate-100 text-slate-455 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <FaHourglassHalf className="w-2 h-2" />
              <span>Draft</span>
            </span>
          )}
        </div>
        {/* Title & Description */}
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-darkGray leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {title || 'Untitled Quiz'}
          </h4>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {description || 'No description provided.'}
          </p>
        </div>
        {/* Middle Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-50 text-[10px] font-bold text-slate-450 text-center">
          <div className="flex flex-col items-center justify-center space-y-1">
            <FaListOl className="w-3.5 h-3.5 text-slate-350" />
            <span>{questions_count} Qs</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 border-x border-slate-50">
            <FaRegClock className="w-3.5 h-3.5 text-slate-350" />
            <span>{time_limit} Mins</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <FaGraduationCap className="w-3.5 h-3.5 text-slate-350" />
            <span>Pass: {passing_score}%</span>
          </div>
        </div>
        {/* Created Date */}
        <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold justify-start pt-1">
          <FaCalendarAlt className="w-3 h-3 text-slate-350" />
          <span>Created: {formatDate(created_at)}</span>
        </div>
      </div>
      {/* Action Buttons (Edit, Questions, Preview, Delete) */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-50">
        
        {/* Edit */}
        <button
          onClick={() => navigate(`/teacher/quiz/edit/${id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-350 text-darkGray-light hover:text-primary rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Edit Details"
        >
          <FaEdit className="w-3.5 h-3.5 mb-1" />
          <span>Edit</span>
        </button>
        {/* Questions */}
        <button
          onClick={() => navigate(`/teacher/quiz/${id}/questions`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-350 text-darkGray-light hover:text-purple-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Manage Questions"
        >
          <FaQuestionCircle className="w-3.5 h-3.5 mb-1" />
          <span>Questions</span>
        </button>
        {/* Preview */}
        <button
          onClick={() => navigate(`/teacher/quiz/preview/${id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-350 text-darkGray-light hover:text-emerald-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Preview Quiz"
        >
          <FaPlayCircle className="w-3.5 h-3.5 mb-1" />
          <span>Preview</span>
        </button>
        {/* Delete */}
        <button
          onClick={() => onDeleteInit(quiz)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-red-200 text-darkGray-light hover:text-red-500 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Delete Quiz"
        >
          <FaTrash className="w-3.5 h-3.5 mb-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
