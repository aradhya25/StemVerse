import React from 'react';
import { FaCheckCircle, FaStar, FaRegEye } from 'react-icons/fa';
export default function QuestionPreviewCard({
  questionText,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer
}) {
  const options = [
    { label: 'A', text: optionA },
    { label: 'B', text: optionB },
    { label: 'C', text: optionC },
    { label: 'D', text: optionD }
  ];
  return (
    <div className="space-y-4">
      {/* Live Preview label */}
      <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider select-none">
        <FaRegEye className="w-3.5 h-3.5" />
        <span>Live Preview</span>
      </div>
      {/* Premium Card Container */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[340px] animate-fadeIn">
        
        <div className="space-y-4">
          {/* Header row: Question Label & Badge */}
          <div className="flex items-center justify-between">
            <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Question 1
            </span>
            
            <span className="inline-flex items-center bg-blue-50 text-primary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Multiple Choice
            </span>
          </div>
          {/* Question Text */}
          <h4 className="text-xs font-black text-darkGray leading-relaxed font-sans line-clamp-3">
            {questionText || 'Your question text will appear here as you type.'}
          </h4>
          {/* Options list */}
          <div className="space-y-2 text-xs font-semibold">
            {options.map((opt) => {
              const isCorrect = correctAnswer?.toUpperCase() === opt.label;
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
                    <span className="truncate">{opt.text || `Option ${opt.label}`}</span>
                  </div>
                  {isCorrect && (
                    <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Footer indicator */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span className="inline-flex items-center space-x-1 bg-yellow-50 text-yellow-600 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
            <FaStar className="w-2.5 h-2.5 mr-1" />
            <span>1 Mark</span>
          </span>
          <span className="uppercase text-[9px] tracking-wide text-slate-400 font-black">Draft Preview</span>
        </div>
      </div>
    </div>
  );
}