import React from "react";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
export default function ProgressTimeline({ progress = [] }) {
  // 1. Get completed lessons only & sort by completed_at descending
  const completions = progress
    .filter((item) => item.completed && item.completed_at)
    .sort(
      (a, b) =>
        new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    );
  const formatTimelineDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
      const time = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (isToday) {
        return `Today at ${time}`;
      }
      if (isYesterday) {
        return `Yesterday at ${time}`;
      }

      return (
        date.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) + ` at ${time}`
      );
    } catch (e) {
      return dateStr;
    }
  };
  if (completions.length === 0) return null;
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Completions Timeline
        </h3>
        <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">
          Timeline of your accomplishments
        </span>
      </div>
      {/* Vertical Timeline Track */}
      <div className="relative border-l border-slate-100 ml-4.5 space-y-8 pb-2">
        {completions.map((item, index) => (
          <div key={item.id || index} className="relative pl-8 group">
            {/* Timeline bullet icon */}
            <div className="absolute -left-4.5 top-0.5 bg-white p-1 rounded-full text-secondary flex items-center justify-center border border-slate-100 shadow-sm transition-transform duration-200 group-hover:scale-110">
              <FaCheckCircle className="w-5 h-5" />
            </div>
            {/* Completion Details */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-extrabold text-darkGray group-hover:text-primary transition-colors">
                  Lesson Completed
                </h4>
                <FaChevronRight className="w-2 h-2 text-slate-350" />
                <span className="text-[10px] font-bold text-slate-400">
                  {formatTimelineDate(item.completed_at)}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold text-slate-400">
                  Lesson
                </span>

                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  <p className="text-sm font-semibold text-darkGray">
                    {item.lesson_title}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {item.course_title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
