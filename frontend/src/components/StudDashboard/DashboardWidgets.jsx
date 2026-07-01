import React from "react";
import {
  FaGraduationCap,
  FaPlayCircle,
  FaHourglassHalf,
  FaAward,
  FaRegClock,
  FaCalendarAlt,
  FaBrain,
  FaBolt,
  FaStar,
  FaEdit,
  FaEnvelope,
  FaChevronRight,
  FaRobot,
} from "react-icons/fa";
// 1. StatsCard Component
export function StatsCard({ dashboard }) {
    console.log("Dashboard Prop:", dashboard);
  const stats = [
    {
      label: "Enrolled Courses",
      value: dashboard?.enrolled_courses || 0,
      growth: "+1 Active",
      icon: <FaGraduationCap className="w-5 h-5 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      label: "Completed Lessons",
    value: dashboard?.completed_lessons || 0,
      growth: "85% Complete",
      icon: <FaPlayCircle className="w-5 h-5 text-white" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
       label: "Pending Lessons",
    value: dashboard?.pending_lessons || 0,
      growth: "Target: 5/wk",
      icon: <FaHourglassHalf className="w-5 h-5 text-white" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      label: "Average Quiz Score",
    value: dashboard?.average_score || 0,
      growth: "Top 10% Rank",
      icon: <FaAward className="w-5 h-5 text-white" />,
      gradient: "from-amber-500 to-orange-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md transition-all duration-300 group-hover:scale-105`}
            >
              {stat.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
              {stat.growth}
            </span>
          </div>
          <div className="mt-5 space-y-1">
            <h3 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
              {stat.value}
            </h3>
            <p className="text-xs font-bold text-darkGray-light uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
// 2. QuizCard Component (Upcoming Quizzes)
export function QuizCard() {
  const quizzes = [
    {
      name: "Quantum Logic Checkpoint",
      course: "Introduction to Quantum Computing",
      deadline: "Tomorrow, 5:00 PM",
      duration: "15 Mins",
      difficulty: "Advanced",
      diffColor: "bg-red-500/10 text-red-500",
    },
    {
      name: "Variables & Flow Control",
      course: "AI-Powered Python & Robotics",
      deadline: "June 30, 11:59 PM",
      duration: "10 Mins",
      difficulty: "Beginner",
      diffColor: "bg-green-500/10 text-green-500",
    },
  ];
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-darkGray font-sans">
          Upcoming Quizzes
        </h3>
        <span className="text-xs text-primary font-bold hover:underline cursor-pointer">
          View All
        </span>
      </div>
      <div className="space-y-4">
        {quizzes.map((quiz, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">
                  {quiz.course}
                </span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${quiz.diffColor}`}
                >
                  {quiz.difficulty}
                </span>
              </div>
              <h4 className="text-sm font-bold text-darkGray group-hover:text-primary transition-colors">
                {quiz.name}
              </h4>
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100/60 text-xs text-slate-400 font-semibold">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <FaRegClock className="w-3.5 h-3.5" />
                  <span>{quiz.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="w-3.5 h-3.5" />
                  <span>{quiz.deadline}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Starting Quiz: ${quiz.name}`)}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all hover:shadow-md"
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// 3. ActivityTimeline Component
export function ActivityTimeline() {
  const activities = [
    {
      title: "Completed Lesson",
      desc: 'Watched "Introduction to Superposition" in Quantum Computing.',
      time: "2 hours ago",
      color: "bg-primary",
    },
    {
      title: "Quiz Attempt",
      desc: 'Scored 90% in "Python Data Types" assessment.',
      time: "Yesterday",
      color: "bg-secondary",
    },
    {
      title: "Course Enrollment",
      desc: 'Enrolled in "Organic Chemistry & Synthesis Models".',
      time: "3 days ago",
      color: "bg-indigo-500",
    },
    {
      title: "Earned Certificate",
      desc: 'Completed all modules in "Calculus Foundations".',
      time: "1 week ago",
      color: "bg-amber-500",
    },
  ];
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium space-y-6">
      <h3 className="text-lg font-bold text-darkGray font-sans">
        Recent Activity
      </h3>

      <div className="relative border-l-2 border-slate-100 ml-3.5 pl-6 space-y-6">
        {activities.map((act, i) => (
          <div key={i} className="relative group">
            {/* Dot Indicator */}
            <span
              className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full ${act.color} ring-4 ring-white group-hover:scale-110 transition-transform`}
            />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-darkGray">{act.title}</h4>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {act.time}
                </span>
              </div>
              <p className="text-xs text-darkGray-light leading-relaxed">
                {act.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// 4. AchievementCard Component
export function AchievementCard() {
  const achievements = [
    {
      name: "First Milestone",
      desc: "First Course Completed",
      icon: <FaAward className="w-5 h-5 text-primary" />,
      bg: "bg-blue-50",
    },
    {
      name: "Quiz Master",
      desc: "Score 100% on three quizzes",
      icon: <FaBrain className="w-5 h-5 text-secondary" />,
      bg: "bg-green-50",
    },
    {
      name: "Fast Learner",
      desc: "Watch 5 lessons in one day",
      icon: <FaBolt className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      name: "Perfect Score",
      desc: "100% in Quantum Gates quiz",
      icon: <FaStar className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium space-y-6">
      <h3 className="text-lg font-bold text-darkGray font-sans">
        Achievements
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((ach, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 group"
          >
            <div
              className={`p-3.5 rounded-xl ${ach.bg} group-hover:scale-105 transition-transform shadow-sm`}
            >
              {ach.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-darkGray">{ach.name}</h4>
              <p className="text-[10px] text-slate-400 font-semibold leading-tight pt-0.5">
                {ach.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// 5. AIAssistantCard Component
export function AIAssistantCard() {
  return (
    <div className="relative rounded-3xl bg-gradient-to-tr from-[#2563EB] to-indigo-800 text-white p-6 shadow-xl overflow-hidden border border-white/10 group">
      {/* Decorative Blur circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-xl pointer-events-none translate-x-6 -translate-y-6" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl pointer-events-none -translate-x-6 translate-y-6" />
      <div className="relative z-10 space-y-5">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
            <FaRobot className="w-6 h-6 text-[#4ADE80]" />
          </div>
          <div>
            <h3 className="text-base font-bold font-sans">Need Help?</h3>
            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">
              AI Learning Assistant
            </p>
          </div>
        </div>
        <p className="text-xs text-blue-100/90 leading-relaxed font-normal">
          Ask STEMVerse AI for immediate calculations, lesson explanations,
          study checklists, and smart quizzes.
        </p>
        <button
          onClick={() => alert("Launching AI Assistant Console...")}
          className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#2563EB] font-bold rounded-xl shadow-md transition-all text-xs hover:-translate-y-0.5"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
// 6. ProfileCard Component
export function ProfileCard() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-darkGray font-sans">
          My Profile
        </h3>
        <button
          onClick={() => alert("Editing Profile details...")}
          className="text-slate-400 hover:text-primary transition-colors"
          aria-label="Edit Profile"
        >
          <FaEdit className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg relative">
          AR
          <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-secondary border-2 border-white rounded-full" />
        </div>
        {/* Info */}
        <div className="space-y-1">
          <h4 className="text-base font-bold text-darkGray">Aradhya Roy</h4>
          <span className="inline-block text-[9px] uppercase font-extrabold tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            Student ID: 41852
          </span>
        </div>
        {/* Grid Meta details */}
        <div className="w-full space-y-2.5 text-xs text-slate-500 pt-2 border-t border-slate-50 text-left font-medium">
          <div className="flex items-center space-x-2.5">
            <FaEnvelope className="text-slate-400 w-3.5 h-3.5" />
            <span>aradhya@stemverse.com</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <FaAward className="text-slate-400 w-3.5 h-3.5" />
            <span>Member Since: Jan 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
