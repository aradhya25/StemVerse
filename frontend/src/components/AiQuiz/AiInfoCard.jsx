import React from 'react';
import { FaBrain, FaCheckDouble, FaHourglassEnd, FaFileAlt } from 'react-icons/fa';
export default function AiInfoCard() {
  const highlights = [
    {
      icon: <FaBrain className="w-4 h-4 text-primary" />,
      title: "Generates high quality MCQs",
      desc: "Produces clear questions, distractors, and accurate correct options matching your topics."
    },
    {
      icon: <FaFileAlt className="w-4 h-4 text-purple-500" />,
      title: "Follows Bloom's Taxonomy",
      desc: "Aligns questions to target different cognitive levels, from knowledge recall to evaluation."
    },
    {
      icon: <FaCheckDouble className="w-4 h-4 text-emerald-500" />,
      title: "Automatically saved into Quiz",
      desc: "Generated questions are instantly pushed into the quiz questions table, no copy-pasting required."
    },
    {
      icon: <FaHourglassEnd className="w-4 h-4 text-blue-500" />,
      title: "Ready for students instantly",
      desc: "Once the generator returns, students can take the quiz immediately from their panels."
    }
  ];
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn flex flex-col justify-between min-h-[460px]">
      
      <div className="space-y-6">
        {/* Header Illustration */}
        <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden select-none">
          <span className="text-5xl animate-bounce duration-1000">✨🤖✨</span>
          <span className="text-[10px] font-black text-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mt-3 border border-slate-100">
            Powered by Gemini AI
          </span>
        </div>
        {/* Feature list */}
        <div className="space-y-4">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3.5 group">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-white group-hover:border-primary/20 transition-all">
                {item.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-black text-darkGray leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-darkGray-light font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer warning */}
      <div className="pt-4 border-t border-slate-50 text-[10px] font-bold text-slate-400">
        <span className="uppercase text-[9px] tracking-wide text-slate-400 font-black">AI Assessment Builder</span>
      </div>
    </div>
  );
}