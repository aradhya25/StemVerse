import React from 'react';
import { FaSpinner } from 'react-icons/fa';
export default function AiGeneratorLoadingOverlay({ isOpen = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Container Card */}
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-100 shadow-2xl text-center space-y-6 animate-scaleUp">
        
        {/* Animated loader */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
          <span className="text-3xl animate-pulse">🤖</span>
        </div>
        {/* Headline */}
        <div className="space-y-2">
          <h3 className="text-lg font-black text-darkGray font-sans">
            Generating AI Questions...
          </h3>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed max-w-xs mx-auto">
            Please wait while Gemini creates intelligent multiple choice questions for your quiz.
          </p>
        </div>
        {/* Indicator subtext */}
        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">
          Hold on, saving directly to quiz...
        </div>
      </div>
    </div>
  );
}
