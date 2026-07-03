import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaCalendarAlt, FaEdit, FaPlayCircle, FaTrash } from 'react-icons/fa';
export default function TeacherQuestionCard({ question, index, onDeleteInit }) {
  const navigate = useNavigate();
  const { id, question_text, option_a, option_b, option_c, option_d, correct_option, marks = 1, created_at } = question || {};
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
  const options = [
    { label: 'A', text: option_a },
    { label: 'B', text: option_b },
    { label: 'C', text: option_c },
    { label: 'D', text: option_d }
  ];
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 animate-fadeIn">
      
      <div className="space-y-4">
        {/* Header row: Question Number & Marks */}
        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Question {index + 1}
          </span>
          
          <span className="inline-flex items-center space-x-1.5 bg-yellow-50 text-yellow-600 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <FaStar className="w-2.5 h-2.5" />
            <span>{marks} {marks === 1 ? 'Mark' : 'Marks'}</span>
          </span>
        </div>
        {/* Question Text */}
        <h4 className="text-xs font-black text-darkGray leading-relaxed font-sans">
          {question_text}
        </h4>
        {/* Options list */}
        <div className="space-y-2 text-xs font-semibold">
          {options.map((opt) => {
            const isCorrect = correct_option?.toUpperCase() === opt.label;
            return (
              <div
                key={opt.label}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-700'
                    : 'border-slate-100 bg-[#F8FAFC] text-darkGray-light'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 select-none ${
                    isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-darkGray-light'
                  }`}>
                    {opt.label}
                  </span>
                  <span className="truncate">{opt.text || '—'}</span>
                </div>
                {isCorrect && (
                  <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
        {/* Created Date */}
        <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-bold justify-start pt-1">
          <FaCalendarAlt className="w-3 text-slate-350" />
          <span>Created: {formatDate(created_at)}</span>
        </div>
      </div>
      {/* Action Buttons row (Edit, Preview, Delete) */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-50">
        
        {/* Edit */}
        <button
          onClick={() => navigate(`/teacher/question/edit/${id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-350 text-darkGray-light hover:text-primary rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Edit Details"
        >
          <FaEdit className="w-3.5 h-3.5 mb-1" />
          <span>Edit</span>
        </button>
        {/* Preview */}
        <button
          onClick={() => navigate(`/teacher/question/preview/${id}`)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-slate-350 text-darkGray-light hover:text-emerald-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Preview Question"
        >
          <FaPlayCircle className="w-3.5 h-3.5 mb-1" />
          <span>Preview</span>
        </button>
        {/* Delete */}
        <button
          onClick={() => onDeleteInit(question)}
          className="inline-flex flex-col items-center justify-center p-2 border border-slate-100 hover:border-red-200 text-darkGray-light hover:text-red-500 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all"
          title="Delete Question"
        >
          <FaTrash className="w-3.5 h-3.5 mb-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
