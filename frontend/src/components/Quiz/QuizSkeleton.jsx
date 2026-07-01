import React from 'react';
export default function QuizSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="space-y-4 border-b border-slate-100 pb-6">
        <div className="w-24 h-4 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="w-1/2 h-7 bg-slate-200 rounded-lg" />
          <div className="w-3/4 h-4 bg-slate-200 rounded" />
        </div>
      </div>
      {/* Progress Bar Skeleton */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="w-32 h-4 bg-slate-200 rounded" />
          <div className="w-16 h-4 bg-slate-200 rounded" />
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full" />
      </div>
      {/* Question Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
        {/* Question sentence */}
        <div className="w-5/6 h-5 bg-slate-200 rounded-lg" />
        
        {/* 4 options rows */}
        <div className="space-y-3.5">
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={n} 
              className="p-4.5 border border-slate-100 rounded-2xl flex items-center space-x-4"
            >
              <div className="w-5 h-5 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="w-2/3 h-4 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
      {/* Buttons Skeleton */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-55">
        <div className="w-24 h-10 bg-slate-200 rounded-xl" />
        <div className="w-32 h-10 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}
