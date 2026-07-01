import React from 'react';
export default function TeacherCoursesSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="flex justify-between items-center pb-2">
        <div className="space-y-2.5 w-1/3">
          <div className="w-36 h-7 bg-slate-200 rounded-lg" />
          <div className="w-56 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-28 h-10 bg-slate-200 rounded-xl" />
      </div>
      {/* 2. Stats Cards Skeleton */}
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
      {/* 3. Search and Filters Row Skeleton */}
      <div className="w-full h-16 bg-slate-200 rounded-3xl" />
      {/* 4. Cards Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4"
          >
            {/* Image placeholder */}
            <div className="w-full h-44 bg-slate-200 rounded-2xl" />
            
            {/* Description lines */}
            <div className="space-y-2.5">
              <div className="w-3/4 h-4.5 bg-slate-200 rounded" />
              <div className="w-full h-3.5 bg-slate-200 rounded" />
              <div className="w-5/6 h-3.5 bg-slate-200 rounded" />
            </div>
            {/* Metrics grid row */}
            <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-50">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
            </div>
            {/* Bottom Row actions */}
            <div className="flex justify-between items-center pt-2">
              <div className="w-20 h-3 bg-slate-200 rounded" />
            </div>
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-50">
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
