import React from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';
export default function CreateQuizForm({
  title,
  setTitle,
  description,
  setDescription,
  timeLimit,
  setTimeLimit,
  passingScore,
  setPassingScore,
  errors = {},
  loading = false,
  onSubmit,
  onCancel
}) {
  const titleLimit = 100;
  const descLimit = 1000;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Quiz Specifications
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Provide key metadata constraints to configure the quiz
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* 1. Quiz Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Quiz Title *</span>
            <span className="text-slate-400">
              {title.length} / {titleLimit}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
            placeholder="Enter quiz title"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.title ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-500 font-bold">{errors.title}</p>
          )}
        </div>
        {/* 2. Quiz Description */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Description *</span>
            <span className="text-slate-400">
              {description.length} / {descLimit}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, descLimit))}
            placeholder="Write a detailed quiz description..."
            rows="5"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.description && (
            <p className="text-[10px] text-red-500 font-bold">{errors.description}</p>
          )}
        </div>
        {/* 3. Time Limit */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Time Limit (Minutes) *
          </label>
          <input
            type="number"
            min="1"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value) || ''))}
            placeholder="e.g. 15"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.timeLimit ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.timeLimit && (
            <p className="text-[10px] text-red-500 font-bold">{errors.timeLimit}</p>
          )}
        </div>
        {/* 4. Passing Score */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Passing Score (%) *
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={passingScore}
            onChange={(e) => setPassingScore(Math.min(100, Math.max(0, parseInt(e.target.value) || '')))}
            placeholder="e.g. 60"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.passingScore ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.passingScore && (
            <p className="text-[10px] text-red-500 font-bold">{errors.passingScore}</p>
          )}
        </div>
        {/* Bottom Form Actions row */}
        <div className="flex items-center justify-end space-x-3.5 pt-4 border-t border-slate-50">
          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="py-3 px-5 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95 disabled:pointer-events-none"
          >
            Cancel
          </button>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-primary to-blue-750 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin w-3.5 h-3.5" />
                <span>Saving Quiz...</span>
              </>
            ) : (
              <>
                <FaSave className="w-3.5 h-3.5" />
                <span>Save Quiz</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
