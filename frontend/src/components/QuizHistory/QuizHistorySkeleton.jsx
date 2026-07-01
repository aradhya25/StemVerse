import React from 'react';
export default function QuizHistorySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* Header Placeholder */}
      <div className="space-y-2">
        <div className="w-48 h-7 bg-slate-200 rounded-lg" />
        <div className="w-80 h-4.5 bg-slate-200 rounded" />
      </div>
      {/* Stats Cards Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between"
          >
            <div className="space-y-2.5 w-1/2">
              <div className="w-16 h-3 bg-slate-200 rounded" />
              <div className="w-12 h-6.5 bg-slate-200 rounded-lg" />
            </div>
            <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
          </div>
        ))}
      </div>
      {/* Search and Filters Bar Placeholder */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/2 h-12 bg-slate-200 rounded-2xl" />
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="w-full sm:w-40 h-12 bg-slate-200 rounded-2xl" />
        </div>
      </div>
      {/* Desktop Table Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden hidden md:block">
        <div className="bg-slate-50 h-11 border-b border-slate-100" />
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex justify-between items-center py-2.5">
              <div className="w-1/4 h-4.5 bg-slate-200 rounded" />
              <div className="w-1/6 h-4.5 bg-slate-200 rounded" />
              <div className="w-1/6 h-4.5 bg-slate-200 rounded" />
              <div className="w-16 h-4.5 bg-slate-200 rounded" />
              <div className="w-20 h-6 bg-slate-200 rounded-full" />
              <div className="w-24 h-9 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Card Placeholders */}
      <div className="space-y-4 md:hidden">
        {[1, 2].map((n) => (
          <div key={n} className="bg-white rounded-3xl p-5 border border-slate-100 space-y-4">
            <div className="flex justify-between">
              <div className="w-1/3 h-5 bg-slate-200 rounded" />
              <div className="w-16 h-5 bg-slate-200 rounded-full" />
            </div>
            <div className="w-2/3 h-4 bg-slate-200 rounded" />
            <div className="h-0.5 bg-slate-100 w-full" />
            <div className="flex justify-between items-center">
              <div className="w-20 h-4 bg-slate-200 rounded" />
              <div className="w-24 h-9 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}