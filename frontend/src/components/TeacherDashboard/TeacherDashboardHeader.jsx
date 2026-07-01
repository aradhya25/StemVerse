import React, { useContext } from 'react';
import { useAuth } from "../../context/AuthContext";
export default function TeacherDashboardHeader() {
 const { user } = useAuth();
  const teacherName = user?.name || 'Instructor';
  return (
    <div className="space-y-1.5 pb-2 animate-fadeIn flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-0.5">
        <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-darkGray-light font-medium mt-1 leading-relaxed">
          Manage your courses, lessons and students efficiently.
        </p>
      </div>
      <div className="bg-white border border-slate-100 px-5 py-3.5 rounded-2xl shadow-sm text-xs font-bold text-darkGray flex items-center space-x-2.5 self-start md:self-auto hover:shadow-md transition-shadow">
        <span className="text-lg">👋</span>
        <div className="leading-tight">
          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Session Profile</span>
          <span className="text-darkGray">Welcome Back, <span className="text-primary font-black">{teacherName}</span></span>
        </div>
      </div>
    </div>
  );
}
