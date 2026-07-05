import React from 'react';
import { FaStar, FaRegStar, FaCommentAlt, FaBook, FaCheckCircle } from 'react-icons/fa';
export default function TeacherReviewsStats({ reviews = [] }) {
  const totalReviews = reviews.length;
  
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 0), 0) / totalReviews).toFixed(1)
    : '0.0';
  const fiveStarReviews = reviews.filter((r) => parseInt(r.rating) === 5).length;
  const coursesReviewed = new Set(reviews.map((r) => r.course_id).filter(Boolean)).size;
  const stats = [
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: <FaCommentAlt className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/50 border-blue-100/50"
    },
    {
      label: "Average Rating",
      value: `${avgRating} / 5.0`,
      icon: <FaStar className="w-5 h-5 text-yellow-500" />,
      bg: "bg-yellow-50/50 border-yellow-100/50"
    },
    {
      label: "5 Star Reviews",
      value: fiveStarReviews,
      icon: <FaCheckCircle className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/50 border-emerald-100/50"
    },
    {
      label: "Courses Reviewed",
      value: coursesReviewed,
      icon: <FaBook className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50/50 border-indigo-100/50"
    }
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`border p-4.5 rounded-2xl flex items-center space-x-3.5 shadow-sm bg-white hover:shadow-md transition-all duration-300 ${stat.bg}`}
        >
          <div className="p-2.5 bg-white border border-slate-100/85 rounded-xl shadow-sm">
            {stat.icon}
          </div>
          <div className="leading-tight">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
              {stat.label}
            </span>
            <p className="text-lg font-black text-darkGray mt-0.5 leading-none">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}