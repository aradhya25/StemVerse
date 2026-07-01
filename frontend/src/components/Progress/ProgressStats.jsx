import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaClock, FaCalendarDay } from 'react-icons/fa';
export default function ProgressStats({ progress = [] }) {
  
  // 1. Completed Lessons
  const completedCount = progress.filter((item) => item.completed).length;
  // 2. Pending Lessons (Hardcoded to 0 as specified by API limits)
  const pendingCount = 0;
  // 3. Total Watch Time
  const totalWatchMinutes = progress.reduce((sum, item) => sum + (item.watch_time || 0), 0);
  const formatWatchTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours} hr`;
  }

  return `${hours}h ${mins}m`;
};
  // 4. Completed Today
  const completedTodayCount = progress.filter((item) => {
    if (!item.completed || !item.completed_at) return false;
    try {
      const date = new Date(item.completed_at);
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    } catch (e) {
      return false;
    }
  }).length;
  const stats = [
    {
      label: 'Completed Lessons',
      value: completedCount,
      icon: <FaCheckCircle className="w-5 h-5 text-secondary" />,
      bg: 'bg-green-50/70',
    },
    {
      label: 'Pending Lessons',
      value: pendingCount,
      icon: <FaHourglassHalf className="w-5 h-5 text-slate-400" />,
      bg: 'bg-slate-50/70',
    },
    {
      label: 'Total Watch Time',
      value: formatWatchTime(totalWatchMinutes),
      icon: <FaClock className="w-5 h-5 text-primary" />,
      bg: 'bg-blue-50/70',
    },
    {
      label: 'Completed Today',
      value: completedTodayCount,
      icon: <FaCalendarDay className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50/70',
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {stat.label}
            </span>
            <p className="text-2xl font-black text-darkGray font-sans leading-tight">
              {stat.value}
            </p>
          </div>
          
          <div className={`p-3.5 rounded-2xl ${stat.bg}`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
