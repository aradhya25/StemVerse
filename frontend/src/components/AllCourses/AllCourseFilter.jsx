import React from 'react';
import { FaSearch, FaGlobe } from 'react-icons/fa';
export default function AllCourseFilter({
  search,
  onSearchChange,
  language,
  onLanguageChange,
  sort,
  onSortChange,
  languages = []
}) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Search Input Box */}
      <div className="relative flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
      </div>
      {/* Language & Sorting Dropdowns */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        
        {/* Language Filter */}
        <div className="relative min-w-[160px] flex-1 sm:flex-initial">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
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
        {/* Sorting Selection Dropdown */}
        <div className="relative min-w-[160px] flex-1 sm:flex-initial">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="a-z">Sort: A to Z</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <span className="text-[10px]">▼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
