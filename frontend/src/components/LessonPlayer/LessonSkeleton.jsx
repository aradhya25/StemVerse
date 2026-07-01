import React from 'react';
export default function LessonSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* Back button skeleton */}
      <div className="w-32 h-4.5 bg-slate-200 rounded" />
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Video + Details (70%) */}
        <div className="lg:col-span-8 space-y-6 w-full">
          {/* Video Player Skeleton */}
          <div className="w-full aspect-video bg-slate-200 rounded-3xl" />
          
          {/* Information Block Skeleton */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-50 pb-5">
              <div className="space-y-2.5 w-2/3">
                <div className="w-20 h-4 bg-slate-200 rounded" />
                <div className="w-full h-6 bg-slate-200 rounded-lg" />
              </div>
              <div className="w-28 h-4 bg-slate-200 rounded self-start sm:self-auto" />
            </div>
            
            <div className="space-y-3">
              <div className="w-24 h-4 bg-slate-200 rounded" />
              <div className="space-y-2">
                <div className="w-full h-4 bg-slate-200 rounded" />
                <div className="w-5/6 h-4 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Right Side: Sidebar (30%) */}
        <div className="lg:col-span-4 w-full">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
              <div className="w-9 h-9 bg-slate-200 rounded-xl" />
              <div className="space-y-1.5 w-1/2">
                <div className="w-24 h-4 bg-slate-200 rounded" />
                <div className="w-16 h-3 bg-slate-200 rounded" />
              </div>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="p-3.5 border border-slate-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-5/6">
                    <div className="w-4 h-3 bg-slate-200 rounded" />
                    <div className="w-full h-4 bg-slate-200 rounded" />
                  </div>
                  <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation bar skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex space-x-3.5">
          <div className="w-28 h-10 bg-slate-200 rounded-xl" />
          <div className="w-28 h-10 bg-slate-200 rounded-xl" />
        </div>
        <div className="w-36 h-11 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}
