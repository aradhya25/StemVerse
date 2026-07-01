import React from 'react';
export default function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-200 flex-shrink-0" />
        <div className="space-y-2.5 w-full sm:w-1/3">
          <div className="w-24 h-6 bg-slate-200 rounded" />
          <div className="w-full h-4 bg-slate-200 rounded" />
        </div>
      </div>
      {/* 2. Info Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="w-36 h-5 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center space-x-4 p-3 border border-slate-100 rounded-2xl">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex-shrink-0" />
              <div className="space-y-2 w-2/3">
                <div className="w-12 h-3 bg-slate-200 rounded" />
                <div className="w-3/4 h-4 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 3. Form Input Cards Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Edit Profile */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="w-24 h-5 bg-slate-200 rounded" />
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-2">
                <div className="w-16 h-3.5 bg-slate-200 rounded" />
                <div className="w-full h-11 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
        {/* Change Password */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
          <div className="w-28 h-5 bg-slate-200 rounded" />
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-2">
                <div className="w-24 h-3.5 bg-slate-200 rounded" />
                <div className="w-full h-11 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}