import React from 'react';
import { FaGlobe } from 'react-icons/fa';
export default function LanguageFilter({ value, onChange, languages = [] }) {
  return (
    <div className="relative min-w-[160px] flex-1 sm:flex-initial">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
      >
        <option value="All">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <FaGlobe className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
