import React from 'react';
import { FaGraduationCap, FaHistory, FaArrowLeft, FaTrophy } from 'react-icons/fa';
export default function QuizResultModal({
  isOpen,
  score = 0,
  total = 0,
  onBackToLesson,
  onViewHistory
}) {
  if (!isOpen) return null;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const correct = score;
  const wrong = Math.max(total - score, 0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-6 animate-scaleUp">
        
        {/* 🎉 Trophy Header */}
        <div className="p-4.5 bg-yellow-50 text-yellow-500 rounded-3xl animate-bounce">
          <FaTrophy className="w-10 h-10" />
        </div>
        {/* Header descriptions */}
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-darkGray font-sans">
            Quiz Completed! 🎉
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Here is your performance breakdown
          </p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Score Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-center">
            <span className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider">Score</span>
            <p className="text-lg font-black text-darkGray mt-1">
              {score} <span className="text-xs text-slate-400 font-bold">/ {total}</span>
            </p>
          </div>
          {/* Percentage Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-center">
            <span className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider">Accuracy</span>
            <p className="text-lg font-black text-primary mt-1">
              {percent}%
            </p>
          </div>
          {/* Correct Answers */}
          <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 flex flex-col justify-center">
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">Correct</span>
            <p className="text-lg font-black text-secondary mt-1">
              {correct}
            </p>
          </div>
          {/* Wrong Answers */}
          <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100 flex flex-col justify-center">
            <span className="text-[10px] font-extrabold uppercase text-red-500 tracking-wider">Incorrect</span>
            <p className="text-lg font-black text-red-600 mt-1">
              {wrong}
            </p>
          </div>
        </div>
        {/* Actions Button List */}
        <div className="flex flex-col space-y-3 w-full pt-2">
          <button
            onClick={onBackToLesson}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all flex items-center justify-center space-x-2"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span>Back to Lesson</span>
          </button>
          
          <button
            onClick={onViewHistory}
            className="w-full py-3.5 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
          >
            <FaHistory className="w-3.5 h-3.5 text-slate-400" />
            <span>View Quiz History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
