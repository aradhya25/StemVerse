import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaStar,
  FaRegClock,
  FaGraduationCap,
  FaBrain,
  FaBell,
  FaInfoCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import {
  getDashboard,
  getContinueLearning,
  getRecentAttempts,
} from "../../../services/studentDashboardApi";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import {
  StatsCard,
  QuizCard,
  ActivityTimeline,
  AchievementCard,
  AIAssistantCard,
  ProfileCard,
} from "../../../components/StudDashboard/DashboardWidgets";
export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [continueLearning, setContinueLearning] = useState([]);

  const [recentAttempts, setRecentAttempts] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardRes = await getDashboard();
        console.log("Dashboard:", dashboardRes.data);
        setDashboard(dashboardRes.data.dashboard);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }

      try {
        const continueRes = await getContinueLearning();

        console.log("Continue API:", continueRes.data);

        setContinueLearning(continueRes.data.courses);

        console.log("Courses Array:", continueRes.data.courses);
      } catch (err) {
        console.error("Continue Error:", err);
      }

      try {
        const attemptsRes = await getRecentAttempts();
        console.log("Attempts:", attemptsRes.data);
        setRecentAttempts(attemptsRes.data.attempts);
      } catch (err) {
        console.error("Attempts Error:", err);
      }

      setLoading(false);
    };

    fetchDashboard();
  }, []);
  //   const continueLearning = [
  //     {
  //       id: 1,
  //       title: 'Introduction to Quantum Computing',
  //       instructor: 'Dr. Evelyn Carter',
  //       progress: 80,
  //       lastLesson: 'Module 3: Superposition & Quantum Gates',
  //       durationLeft: '2h 15m left',
  //       totalLessons: '15 Lessons',
  //       category: 'Physics',
  //     },
  //     {
  //       id: 2,
  //       title: 'AI-Powered Python & Robotics',
  //       instructor: 'Alex Rivera, AI Engine',
  //       progress: 45,
  //       lastLesson: 'Module 2: Actuator Speed Controllers',
  //       durationLeft: '5h 10m left',
  //       totalLessons: '24 Lessons',
  //       category: 'Computer Science',
  //     },
  //   ];
  const recommendedCourses = [
    {
      title: "Computational Geometry & Matrices",
      category: "Mathematics",
      rating: 4.8,
      reviews: 580,
      instructor: "Prof. Marcus Vance",
      tag: "New AI Assessed",
    },
    {
      title: "Organic Chemistry & Reaction Synthesis",
      category: "Chemistry",
      rating: 4.9,
      reviews: 210,
      instructor: "Dr. Sarah Jenkins",
      tag: "Highly Rated",
    },
  ];
  const notifications = [
    {
      text: "AI generated a new custom quiz for Quantum Computing",
      time: "10m ago",
      type: "new",
    },
    {
      text: "AP Physics syllabus updated by instructor",
      time: "2h ago",
      type: "info",
    },
    {
      text: 'Urgent: "Flow Control" quiz deadline tomorrow',
      time: "1d ago",
      type: "urgent",
    },
  ];
  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-[70vh]">
          Loading...
        </div>
      </StudentLayout>
    );
  }
  console.log("Continue State:", continueLearning);
  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
              Student Dashboard
            </h1>
            <p className="text-sm text-darkGray-light font-medium mt-1">
              Track your learning progress and continue where you left off.
            </p>
          </div>

          {/* Quick AI Info banner */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-secondary/10 text-secondary text-xs font-bold rounded-xl border border-secondary/10 self-start md:self-auto">
            <FaRegCheckCircle className="w-3.5 h-3.5" />
            <span>All AI engines operating normally</span>
          </div>
        </div>
        {/* 1. STATISTICS CARDS GRID */}
        <StatsCard dashboard={dashboard} />
        {/* MAIN SPLIT COLUMNS LAYOUT */}
        <div className="space-y-8">
          {/* LEFT AREA: Primary learning content */}
          <div className="xl:col-span-8 space-y-8">
            {/* CONTINUE LEARNING SECTION */}
            <div className="space-y-4">
              {/* <h3 className="text-lg font-bold text-darkGray font-sans">
                Continue Learning
              </h3> */}

              <div className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-darkGray font-sans">
                    Continue Learning
                  </h3>

                  {continueLearning.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-premium">
                      <h4 className="text-lg font-semibold text-darkGray">
                        No Courses Found
                      </h4>

                      <p className="text-sm text-slate-500 mt-2">
                        Enroll in a course to start learning.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {continueLearning.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                        >
                          {/* Left */}
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">
                                COURSE
                              </span>

                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />

                              <span className="text-[10px] text-slate-400 font-semibold">
                                Current Lesson
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-darkGray group-hover:text-primary transition-colors">
                              {item.course_title}
                            </h4>

                            <p className="text-xs text-darkGray-light font-medium">
                              Status :
                              <span
                                className={`ml-2 font-semibold ${
                                  item.completed
                                    ? "text-green-600"
                                    : "text-orange-500"
                                }`}
                              >
                                {item.completed ? "Completed" : "In Progress"}
                              </span>
                            </p>

                            <div className="pt-2 text-xs text-slate-400 font-medium">
                              Current Lesson :
                              <span className="text-slate-600 font-semibold ml-1">
                                {item.lesson_title}
                              </span>
                            </div>
                          </div>

                          {/* Right */}
                          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-6 md:w-80">
                            <div className="flex-1 space-y-1.5">
                              <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-400">Progress</span>

                                <span className="text-primary">
                                  {item.completed ? "100%" : "50%"}
                                </span>
                              </div>

                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-primary to-blue-500 h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: item.completed ? "100%" : "50%",
                                  }}
                                />
                              </div>

                              <div className="text-[10px] text-slate-400 font-semibold text-right">
                                Watch Time : {item.watch_time ?? 0} min
                              </div>
                            </div>

                            <button className="bg-primary hover:bg-primary-dark text-green font-bold rounded-xl px-5 py-3 text-xs shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                              <FaPlay className="w-2.5 h-2.5" />

                              <span>Resume</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* LEARNING PROGRESS (CIRCULAR COMPLETION PLACEHOLDER) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <h3 className="text-lg font-bold text-darkGray font-sans">
                Learning Analytics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Circular Placeholder Card (Left) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* SVG Radial Tracker Mockup */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-slate-100 fill-none"
                        strokeWidth="12"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-primary fill-none"
                        strokeWidth="12"
                        strokeDasharray="377"
                        strokeDashoffset="113"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-extrabold text-darkGray font-sans">
                        70%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
                {/* Progress Stats details (Right) */}
                <div className="md:col-span-8 grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-darkGray">
                      12.5 hrs
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Hours Learned
                    </p>
                    <p className="text-[10px] text-[#22C55E] font-bold">
                      +2.4h this week
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-darkGray">
                      42 / 60
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Lessons Finished
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      18 remaining
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-darkGray">92%</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Quiz Accuracy
                    </p>
                    <p className="text-[10px] text-[#22C55E] font-bold">
                      Top 5% score rate
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-darkGray">
                      100%
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Attendance Rate
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      All webinars attended
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* RECOMMENDED COURSES */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-darkGray font-sans">
                Recommended For You
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedCourses.map((course, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">
                          {course.category}
                        </span>
                        <span className="text-[9px] font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase">
                          {course.tag}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-darkGray group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>

                      <p className="text-xs text-slate-400 font-semibold">
                        Instructor: {course.instructor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
                      <div className="flex items-center text-yellow-500 space-x-1">
                        <FaStar className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold text-darkGray">
                          {course.rating}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({course.reviews})
                        </span>
                      </div>

                      <button
                        onClick={() => alert(`Enrolling in: ${course.title}`)}
                        className="bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl px-4 py-2 transition-all hover:shadow-md"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* RIGHT AREA: Side Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* AI Assistant */}
            <AIAssistantCard />
            {/* Profile summary */}
            <ProfileCard />
            {/* Upcoming Quizzes */}
            <QuizCard />
            {/* Notifications Panel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-darkGray uppercase tracking-wider">
                  Recent Alerts
                </h3>
                <FaInfoCircle className="text-slate-300 w-4.5 h-4.5" />
              </div>

              <div className="space-y-3.5">
                {notifications.map((notif, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 text-xs leading-relaxed"
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        notif.type === "new"
                          ? "bg-primary"
                          : notif.type === "urgent"
                            ? "bg-red-500"
                            : "bg-slate-400"
                      }`}
                    />
                    <div className="flex-1 font-medium">
                      <p className="text-darkGray">{notif.text}</p>
                      <span className="text-[10px] text-slate-400">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Achievements */}
            <AchievementCard />
            {/* Activities */}
            <ActivityTimeline />
          </div>
        </div>
        {/* MOCK DASHBOARD FOOTER */}
        <footer className="pt-8 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-4">
          <p>© 2026 STEMVerse Learning Management System.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#support" className="hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </footer>
      </div>
    </StudentLayout>
  );
}
