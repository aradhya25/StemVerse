import React, { useState, useEffect } from "react";
import { getMyAttempts } from "../../../services/quizAttemptApi";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import QuizHistoryHeader from "../../../components/QuizHistory/QuizHistoryHeader";
import QuizHistoryStats from "../../../components/QuizHistory/QuizHistoryStats";
import QuizHistoryTable from "../../../components/QuizHistory/QuizHistoryTable";
import QuizHistoryCard from "../../../components/QuizHistory/QuizHistoryCard";
import QuizHistoryEmpty from "../../../components/QuizHistory/QuizHistoryEmpty";
import QuizHistorySkeleton from "../../../components/QuizHistory/QuizHistorySkeleton";
import QuizAttemptDetailsModal from "../../../components/QuizHistory/QuizAttemptDetailsModal";
import { FaSearch, FaRedo, FaExclamationTriangle } from "react-icons/fa";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_ATTEMPTS = [
//   {
//     id: "att_1",
//     quiz_id: "q_101",
//     quiz_title: "Quantum Superposition & Qubits Quiz",
//     lesson_id: "101",
//     lesson_title: "Introduction to Qubits & Superposition",
//     course_id: "1",
//     course_title: "Introduction to Quantum Computing",
//     score: 3,
//     total_questions: 3,
//     attempted_at: "2026-06-28T10:30:45.000Z"
//   },
//   {
//     id: "att_2",
//     quiz_id: "q_102",
//     quiz_title: "Quantum Logic Gates Assessment",
//     lesson_id: "102",
//     lesson_title: "Understanding Quantum Logic Gates",
//     course_id: "1",
//     course_title: "Introduction to Quantum Computing",
//     score: 2,
//     total_questions: 3,
//     attempted_at: "2026-06-28T11:15:20.000Z"
//   },
//   {
//     id: "att_3",
//     quiz_id: "q_202",
//     quiz_title: "Robotics Motor Speed Quiz",
//     lesson_id: "202",
//     lesson_title: "Robotics Actuators & Controls",
//     course_id: "2",
//     course_title: "AI-Powered Python & Robotics",
//     score: 1,
//     total_questions: 2,
//     attempted_at: "2026-06-27T15:45:00.000Z"
//   },
//   {
//     id: "att_4",
//     quiz_id: "q_301",
//     quiz_title: "Vectors & Spaces Quiz",
//     lesson_id: "301",
//     lesson_title: "Vector Spaces and Matrices",
//     course_id: "3",
//     course_title: "Computational Algebra Foundations",
//     score: 0,
//     total_questions: 1,
//     attempted_at: "2026-06-25T14:10:00.000Z"
//   }
// ];
export default function QuizHistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filter States
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'highest' | 'lowest'
  // 1. Fetch Quiz attempts from GET /api/attempts/my-attempts
  // const [selectedAttempt, setSelectedAttempt] = useState(null);

  // const [detailsOpen, setDetailsOpen] = useState(false);
  const fetchAttempts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getMyAttempts();

      setAttempts(res.data.attempts);
    } catch (err) {
      console.error(err);
      setError("Failed to load quiz history.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAttempts();
  }, []);
  // 2. Click actions
  const handleViewDetails = (attemptId) => {
    alert(
      `Loading full details and answer log audit for attempt: ID ${attemptId}`,
    );
  };
  // 3. Filter and Sorting Engine
  const filteredAttempts = attempts
    .filter((att) => {
      const matchSearch =
        att.quiz_title.toLowerCase().includes(search.toLowerCase()) ||
        att.lesson_title.toLowerCase().includes(search.toLowerCase()) ||
        att.course_title.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.attempted_at).getTime() -
          new Date(a.attempted_at).getTime()
        );
      }
      if (sortBy === "oldest") {
        return (
          new Date(a.attempted_at).getTime() -
          new Date(b.attempted_at).getTime()
        );
      }

      const accA = a.total_questions > 0 ? a.score / a.total_questions : 0;
      const accB = b.total_questions > 0 ? b.score / b.total_questions : 0;
      if (sortBy === "highest") {
        return accB - accA;
      }
      if (sortBy === "lowest") {
        return accA - accB;
      }
      return 0;
    });
  return (
    <StudentLayout>
      <div className="space-y-8 relative">
        {/* Loading Skeleton */}
        {isLoading && <QuizHistorySkeleton />}
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
                Unable to load your quiz attempt history from the server.
              </p>
            </div>
            <button
              onClick={fetchAttempts}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <FaRedo className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
        {/* Content loaded successfully */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header metadata */}
            <QuizHistoryHeader />
            {/* Statistics Row Card Panels */}
            {attempts.length > 0 && <QuizHistoryStats attempts={attempts} />}
            {/* Search and sorting criteria row */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by quiz, course, or lesson..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
              {/* Sorting selection dropdown */}
              <div className="relative min-w-[180px] flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                  <option value="highest">Sort: Highest Accuracy</option>
                  <option value="lowest">Sort: Lowest Accuracy</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>
            {/* Attempts Display (Table for desktop, Cards for mobile) */}
            {filteredAttempts.length > 0 ? (
              <div className="space-y-4">
                {/* Desktop View Table */}
                <QuizHistoryTable
                  attempts={filteredAttempts}
                  onViewDetails={handleViewDetails}
                />
                {/* Mobile View Cards */}
                <div className="space-y-4 md:hidden">
                  {filteredAttempts.map((attempt) => (
                    <QuizHistoryCard
                      key={attempt.id}
                      attempt={attempt}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <QuizHistoryEmpty />
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
