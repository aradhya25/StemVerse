import React, { useState, useEffect } from "react";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import ProgressHeader from "../../../components/Progress/ProgressHeader";
import ProgressStats from "../../../components/Progress/ProgressStats";
import ProgressTable from "../../../components/Progress/ProgressTable";
import ProgressTimeline from "../../../components/Progress/ProgressTimeline";
import ProgressEmpty from "../../../components/Progress/ProgressEmpty";
import ProgressSkeleton from "../../../components/Progress/ProgressSkeleton";
import { FaSearch, FaRedo, FaExclamationTriangle } from "react-icons/fa";
import { getMyProgress } from "../../../services/progressApi";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_PROGRESS = [
//   {
//     id: "prog_1",
//     user_id: "user_01",
//     lesson_id: "101",
//     watch_time: 15,
//     completed: true,
//     completed_at: "2026-06-28T10:00:00.000Z", // Today
//   },
//   {
//     id: "prog_2",
//     user_id: "user_01",
//     lesson_id: "102",
//     watch_time: 20,
//     completed: true,
//     completed_at: "2026-06-28T11:00:00.000Z", // Today
//   },
//   {
//     id: "prog_3",
//     user_id: "user_01",
//     lesson_id: "202",
//     watch_time: 30,
//     completed: true,
//     completed_at: "2026-06-27T15:00:00.000Z", // Yesterday
//   },
// ];
export default function ProgressPage() {
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter States
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'highest' | 'lowest'
  // 1. Fetch Progress API (GET /api/progress/my-progress)
  const fetchProgress = async () => {
    console.log("Fetching progress...");

    setIsLoading(true);

    try {
      const res = await getMyProgress();

      console.log("API Response:", res.data);

      setProgress(res.data.progress);
    } catch (err) {
      console.error("Progress Error:", err);
    } finally {
      console.log("Loading finished");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProgress();
  }, []);
  // 2. Filter & Sort Engine
  const filteredProgress = progress
    .filter((item) => {
      // Filter strictly by Lesson ID
      return item.lesson_title?.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.completed_at || 0).getTime() -
          new Date(a.completed_at || 0).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.completed_at || 0).getTime() -
          new Date(b.completed_at || 0).getTime()
        );
      }
      if (sortBy === "highest") {
        return (b.watch_time || 0) - (a.watch_time || 0);
      }
      if (sortBy === "lowest") {
        return (a.watch_time || 0) - (b.watch_time || 0);
      }
      return 0;
    });
  return (
    <StudentLayout>
      <div className="space-y-8 relative">
        {/* Loading Skeletons */}
        {isLoading && <ProgressSkeleton />}
        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium text-center space-y-6 max-w-md mx-auto">
            <div className="p-4 bg-red-50 text-red-500 rounded-2xl inline-block">
              <FaExclamationTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-darkGray">
                Connection Error
              </h3>
              <p className="text-xs text-slate-400">
                Unable to load your learning progress from the server.
              </p>
            </div>
            <button
              onClick={fetchProgress}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <FaRedo className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
        {/* Content Loaded */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header titles */}
            <ProgressHeader />
            {/* Statistics row cards */}
            {progress.length > 0 && <ProgressStats progress={progress} />}
            {/* Filters Row */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Lesson Title..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
              {/* Sorting option select */}
              <div className="relative min-w-[180px] flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                  <option value="highest">Sort: Highest Watch Time</option>
                  <option value="lowest">Sort: Lowest Watch Time</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>
            {/* Data panels */}
            {filteredProgress.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Side: Table List (66%) */}
                <div className="lg:col-span-2 space-y-6">
                  <ProgressTable progress={filteredProgress} />
                </div>
                {/* Right Side: Timeline completions (33%) */}
                <div className="lg:col-span-1">
                  <ProgressTimeline progress={filteredProgress} />
                </div>
              </div>
            ) : (
              <ProgressEmpty />
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
