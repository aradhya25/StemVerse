import React from 'react';
export default function TeacherDashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* 1. Header Welcome */}
      <div className="space-y-2.5">
        <div className="w-56 h-7 bg-slate-200 rounded-lg" />
        <div className="w-80 h-4.5 bg-slate-200 rounded" />
      </div>
      {/* 2. Stats Grid Skeletons (5 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div 
            key={n} 
            className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center justify-between"
          >
            <div className="space-y-2.5 w-1/2">
              <div className="w-16 h-3 bg-slate-200 rounded" />
              <div className="w-12 h-7 bg-slate-200 rounded-lg" />
              <div className="w-20 h-3 bg-slate-200 rounded" />
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-2xl flex-shrink-0" />
          </div>
        ))}
      </div>
      {/* 3. Quick Actions Skeletons */}
      <div className="space-y-4">
        <div className="w-28 h-4 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-28 bg-slate-200 rounded-3xl" />
          ))}
        </div>
      </div>
      {/* 4. Skeletons for Recent Courses & Recent Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Courses */}
        <div className="space-y-4">
          <div className="w-32 h-4 bg-slate-200 rounded" />
          {[1, 2].map((n) => (
            <div key={n} className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-28 h-24 bg-slate-200 rounded-2xl flex-shrink-0" />
              <div className="flex-grow space-y-3.5">
                <div className="w-1/2 h-5 bg-slate-200 rounded" />
                <div className="w-24 h-3 bg-slate-200 rounded" />
                <div className="flex justify-end">
                  <div className="w-16 h-6.5 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent Lessons */}
        <div className="space-y-4">
          <div className="w-32 h-4 bg-slate-200 rounded" />
          {[1, 2].map((n) => (
            <div key={n} className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2 w-1/2">
                  <div className="w-36 h-4 bg-slate-200 rounded" />
                  <div className="w-24 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-14 h-5 bg-slate-200 rounded-full" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <div className="w-24 h-3 bg-slate-200 rounded" />
                <div className="w-20 h-6.5 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 5. Skeletons for Recent Enrollments, Top Courses & Quiz Performance */}
      <div className="space-y-8">
        
        {/* Recent Enrollments */}
        <div className="space-y-4">
          <div className="w-36 h-4 bg-slate-200 rounded" />
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden h-44" />
        </div>
        {/* Top Courses & Quiz Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Courses */}
          <div className="space-y-4">
            <div className="w-28 h-4 bg-slate-200 rounded" />
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-100 p-5 flex justify-between items-center">
                <div className="space-y-2 w-2/3">
                  <div className="w-32 h-4 bg-slate-200 rounded" />
                  <div className="w-20 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-16 h-5.5 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
          {/* Quiz Performance */}
          <div className="space-y-4">
            <div className="w-32 h-4 bg-slate-200 rounded" />
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6 h-52" />
          </div>
        </div>
      </div>
    </div>
  );
}
