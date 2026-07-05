import React from 'react';
import { FaBrain, FaSpinner } from 'react-icons/fa';
export default function AiQuizGeneratorForm({
  quizzes = [],
  quizId,
  setQuizId,
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  numberOfQuestions,
  setNumberOfQuestions,
  errors = {},
  loading = false,
  onSubmit
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Generator Settings
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Configure topic prompts and quiz limits
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* 1. Select Target Quiz */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Select Quiz *
          </label>
          <div className="relative">
            <select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.quizId ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            >
              <option value="">Select Target Quiz</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-semibold">
              ▼
            </div>
          </div>
          {errors.quizId && (
            <p className="text-[10px] text-red-500 font-bold">{errors.quizId}</p>
          )}
        </div>
        {/* 2. Topic / Lesson Notes prompt text */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Topic & Details *
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Acids and Bases chemical reaction equations, or paste lesson notes here..."
            rows="5"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.topic ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
            }`}
          />
          {errors.topic && (
            <p className="text-[10px] text-red-500 font-bold">{errors.topic}</p>
          )}
        </div>
        {/* 3. Difficulty */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Difficulty Level *
          </label>
          <div className="relative">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.difficulty ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-semibold">
              ▼
            </div>
          </div>
          {errors.difficulty && (
            <p className="text-[10px] text-red-500 font-bold">{errors.difficulty}</p>
          )}
        </div>
        {/* 4. Number of Questions */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Number of Questions *
          </label>
          <div className="relative">
            <select
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value) || '')}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.numberOfQuestions ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            >
              <option value="">Select Count</option>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={30}>30 Questions</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-semibold">
              ▼
            </div>
          </div>
          {errors.numberOfQuestions && (
            <p className="text-[10px] text-red-500 font-bold">{errors.numberOfQuestions}</p>
          )}
        </div>
        {/* Action Button */}
        <div className="pt-4 border-t border-slate-50">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin w-3.5 h-3.5" />
                <span>Generating AI Quiz...</span>
              </>
            ) : (
              <>
                <FaBrain className="w-3.5 h-3.5" />
                <span>Generate Quiz</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}