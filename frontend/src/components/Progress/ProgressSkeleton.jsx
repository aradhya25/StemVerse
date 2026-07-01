import React from 'react';
export default function ProgressSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="space-y-2">
        <div className="w-48 h-7 bg-slate-200 rounded-lg" />
        <div className="w-80 h-4.5 bg-slate-200 rounded" />
      </div>
      {/* 2. Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between"
          >
            <div className="space-y-2.5 w-1/2">
              <div className="w-16 h-3 bg-slate-200 rounded" />
              <div className="w-20 h-6.5 bg-slate-200 rounded-lg" />
            </div>
            <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
          </div>
        ))}
      </div>
      {/* 3. Search and Table Layout Skeleton */}
      <div className="space-y-6">
        {/* Search bar */}
        <div className="w-full md:w-1/2 h-12 bg-slate-200 rounded-2xl" />
        
        {/* Grid / Table */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 h-11 border-b border-slate-100" />
          <div className="p-6 space-y-4.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex justify-between items-center py-2">
                <div className="w-1/4 h-4.5 bg-slate-200 rounded" />
                <div className="w-1/6 h-4.5 bg-slate-200 rounded" />
                <div className="w-20 h-6 bg-slate-200 rounded-full" />
                <div className="w-28 h-4.5 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 4. Timeline Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="w-36 h-5 bg-slate-200 rounded" />
        <div className="space-y-6 pl-4 border-l border-slate-100">
          {[1, 2].map((n) => (
            <div key={n} className="relative pl-8 space-y-2">
              <div className="w-24 h-4 bg-slate-200 rounded" />
              <div className="w-40 h-8 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}