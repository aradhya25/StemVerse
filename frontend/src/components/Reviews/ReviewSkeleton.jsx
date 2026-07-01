import React from 'react';
export default function ReviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      
      {/* 1. Rating Summary Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 w-full sm:w-auto justify-center sm:justify-start">
          <div className="space-y-2">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-24 h-8 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div className="space-y-2">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-20 h-6 bg-slate-200 rounded-lg" />
          </div>
        </div>
        <div className="w-28 h-5 bg-slate-200 rounded" />
      </div>
      {/* 2. Form Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-5">
        <div className="space-y-2">
          <div className="w-28 h-4 bg-slate-200 rounded" />
          <div className="w-48 h-3 bg-slate-200 rounded" />
        </div>
        <div className="w-24 h-5 bg-slate-200 rounded" />
        <div className="w-full h-24 bg-slate-200 rounded-2xl" />
        <div className="flex justify-end">
          <div className="w-28 h-10 bg-slate-200 rounded-xl" />
        </div>
      </div>
      {/* 3. Cards Skeletons */}
      <div className="space-y-4">
        {[1, 2].map((n) => (
          <div key={n} className="bg-white rounded-3xl border border-slate-100 p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-200 rounded-2xl flex-shrink-0" />
            <div className="flex-grow space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-1.5 w-1/3">
                  <div className="w-24 h-4 bg-slate-200 rounded" />
                  <div className="w-16 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-16 h-3 bg-slate-200 rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="w-full h-3 bg-slate-200 rounded" />
                <div className="w-5/6 h-3 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}