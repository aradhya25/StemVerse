import React from 'react';
export default function CourseSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Hero Banner Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center">
        {/* Left thumbnail frame */}
        <div className="w-full lg:w-[41.6%] aspect-video bg-slate-200 rounded-2xl flex-shrink-0" />
        
        {/* Right info text */}
        <div className="flex-1 space-y-4 py-2 w-full">
          <div className="w-3/4 h-7 bg-slate-200 rounded-lg" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-slate-200 rounded" />
            <div className="w-5/6 h-4 bg-slate-200 rounded" />
          </div>
          <div className="w-32 h-4 bg-slate-200 rounded" />
          <div className="w-40 h-12 bg-slate-200 rounded-xl" />
        </div>
      </div>
      {/* 2. Info Cards Row Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
          <div className="space-y-1.5 w-full">
            <div className="w-12 h-3 bg-slate-200 rounded" />
            <div className="w-20 h-4.5 bg-slate-200 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
          <div className="space-y-1.5 w-full">
            <div className="w-12 h-3 bg-slate-200 rounded" />
            <div className="w-24 h-4.5 bg-slate-200 rounded-lg" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
          <div className="space-y-1.5 w-full">
            <div className="w-12 h-3 bg-slate-200 rounded" />
            <div className="w-16 h-4.5 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
      {/* 3. Lessons Section Skeleton */}
      <div className="space-y-4">
        {/* Title */}
        <div className="w-36 h-6 bg-slate-200 rounded-lg" />
        
        {/* List lines */}
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className="w-11 h-11 bg-slate-200 rounded-xl flex-shrink-0" />
              <div className="space-y-2 w-1/2">
                <div className="w-24 h-3 bg-slate-200 rounded" />
                <div className="w-3/4 h-4.5 bg-slate-200 rounded-lg" />
              </div>
            </div>
            <div className="w-24 h-9 bg-slate-200 rounded-lg flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
