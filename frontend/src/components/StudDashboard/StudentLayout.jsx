import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBrain,
  FaHome,
  FaBook,
  FaChartLine,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
export default function StudentLayout({ children }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome className="w-4 h-4" />,
      path: "/student/dashboard",
    },
    {
      name: "All Courses",
      icon: <FaGraduationCap className="w-4 h-4" />,
      path: "/all-courses",
    },
    {
      name: "My Courses",
      icon: <FaBook className="w-4 h-4" />,
      path: "/courses",
    },
    {
      name: "Progress",
      icon: <FaChartLine className="w-4 h-4" />,
      path: "/student/progress",
    },
    {
      name: "Quiz History",
      icon: <FaHistory className="w-4 h-4" />,
      path: "/student/quiz-history",
    },
    {
      name: "Profile",
      icon: <FaUser className="w-4 h-4" />,
      path: "/student/profile",
    },
    {
      name: "Settings",
      icon: <FaCog className="w-4 h-4" />,
      path: "#settings",
    },
  ];
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* MOBILE HEADER (TOP) */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white shadow-md">
            <FaBrain className="h-6 w-6" />
          </div>
          <span className="text-lg font-bold tracking-tight text-darkGray">
            STEM<span className="text-primary">Verse</span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-darkGray hover:text-primary hover:bg-slate-50 transition-colors"
          aria-label="Open sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </header>
      <div className="flex flex-1 relative">
        {/* SIDEBAR CONTAINER (DESKTOP) */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white border-r border-slate-100 p-6 z-40 justify-between">
          <div className="space-y-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white shadow-md">
                <FaBrain className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-darkGray font-sans">
                STEM<span className="text-primary">Verse</span>
              </span>
            </Link>
            {/* Menu Items */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-darkGray-light hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Logout Button */}
          <Link
            to="/login"
            className="flex items-center space-x-3.5 px-4.5 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-auto"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </aside>
        {/* MOBILE SIDEBAR DRAWER (OVERLAY) */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Dark background overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className={`absolute top-0 left-0 bottom-0 w-64 bg-white p-6 flex flex-col justify-between transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="bg-primary p-2 rounded-xl text-white">
                    <FaBrain className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold text-darkGray">
                    STEMVerse
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-darkGray"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              {/* Mobile Drawer Menu */}
              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-slate-600 hover:text-primary hover:bg-slate-50"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            {/* Mobile Logout */}
            <Link
              to="/login"
              className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </Link>
          </aside>
        </div>
        {/* MAIN BODY LAYOUT */}
        <div className="flex-1 lg:ml-64 min-w-0 flex flex-col">
          {/* TOP NAVBAR (DESKTOP) */}
          <nav className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 sticky top-0 z-25 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-darkGray font-sans">
                Welcome Back,{user?.name || "Student"} 👋
              </h2>
              <p className="text-xs text-darkGray-light font-medium mt-0.5">
                Continue your learning journey.
              </p>
            </div>
            {/* Profile Avatar / Notification Panel */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => alert("Notifications Panel is ready!")}
                className="relative p-2 rounded-xl text-darkGray-light hover:text-primary hover:bg-slate-50 transition-all border border-slate-200/60"
                aria-label="View notifications"
              >
                <FaBell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary animate-pulse" />
              </button>
              <div className="flex items-center space-x-3 border-l border-slate-150 pl-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  {user?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase() || "S"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-darkGray leading-none">
                    {user?.name || "Student"}
                  </h4>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-secondary mt-1 bg-secondary/10 px-2 py-0.5 rounded-full">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </nav>
          {/* DASHBOARD CONTENT BODY */}
          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
