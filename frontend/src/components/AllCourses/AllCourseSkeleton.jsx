import React from 'react';
export default function AllCourseSkeleton({ count = 4 }) {
  const cards = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cards.map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-3xl border border-slate-100 p-6 space-y-5 animate-pulse flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Thumbnail */}
            <div className="aspect-video w-full bg-slate-200 rounded-2xl" />
            
            {/* Created By */}
            <div className="w-1/2 h-3.5 bg-slate-200 rounded" />
            
            {/* Title Line */}
            <div className="w-5/6 h-5 bg-slate-200 rounded-lg" />
            
            {/* Description lines */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded" />
              <div className="w-2/3 h-3 bg-slate-200 rounded" />
            </div>
          </div>
          {/* Date & Button */}
          <div className="space-y-4 pt-4 border-t border-slate-50">
            {/* Date line */}
            <div className="w-1/3 h-3.5 bg-slate-200 rounded" />
            
            {/* Button */}
            <div className="w-full h-11 bg-slate-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
