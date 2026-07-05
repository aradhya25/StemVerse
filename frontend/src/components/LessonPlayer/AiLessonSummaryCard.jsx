import React from 'react';
import { FaBrain, FaSpinner, FaLightbulb, FaBookOpen } from 'react-icons/fa';
export default function AiLessonSummaryCard({
  summary = '',
  loading = false,
  onGenerate
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      
      {/* Card Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50 pb-4">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-darkGray font-sans flex items-center gap-2">
            <span>✨</span> AI Lesson Summary
          </h3>
          <p className="text-xs text-darkGray-light font-medium leading-relaxed max-w-lg">
            Generate an AI-powered summary to quickly revise this lesson before attempting the quiz.
          </p>
        </div>
        {/* Generate Trigger Button (only visible if not already loading or empty) */}
        {!loading && (
          <button
            onClick={onGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 disabled:pointer-events-none"
          >
            <FaBrain className="w-3.5 h-3.5" />
            <span>Generate Summary</span>
          </button>
        )}
      </div>
      {/* 1. Loading State */}
      {loading && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <FaSpinner className="animate-spin text-primary w-12 h-12" />
            <span className="absolute text-xl animate-pulse">⚡</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-darkGray">
              Generating AI Summary...
            </h4>
            <p className="text-xs text-slate-400 font-medium leading-none">
              Analyzing lesson content... Please wait...
            </p>
          </div>
        </div>
      )}
      {/* 2. Empty State */}
      {!loading && !summary && (
        <div className="py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4 animate-fadeIn">
          {/* Illustration placeholder */}
          <div className="w-20 h-20 bg-indigo-50 border border-slate-100 rounded-2xl flex items-center justify-center text-4xl select-none animate-pulse">
            📓
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-darkGray">
              No AI summary generated yet.
            </h4>
            <p className="text-xs text-darkGray-light font-normal leading-relaxed">
              Click Generate Summary to instantly create concise revision notes using AI.
            </p>
          </div>
        </div>
      )}
      {/* 3. Summary Content State */}
      {!loading && summary && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Summary Details Box */}
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 md:p-6 space-y-3.5">
            <h4 className="text-xs font-black text-darkGray flex items-center gap-2 border-b border-slate-200/50 pb-2">
              <FaBookOpen className="w-3.5 h-3.5 text-primary" />
              <span>AI Generated Summary</span>
            </h4>
            
            <p className="text-xs text-darkGray-light font-medium leading-relaxed whitespace-pre-line px-1">
              {summary}
            </p>
          </div>
          {/* Bottom Info Tip Box */}
          <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4.5 flex items-start space-x-3 text-xs">
            <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-primary flex-shrink-0">
              <FaLightbulb className="w-3.5 h-3.5" />
            </div>
            <div className="leading-relaxed">
              <h5 className="font-extrabold text-darkGray leading-none">
                Study Tip
              </h5>
              <p className="text-darkGray-light font-normal mt-1 leading-relaxed text-[11px]">
                Review this summary once before attempting the quiz to improve retention and exam performance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}