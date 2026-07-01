import React from 'react';
import { FaUser, FaEnvelope, FaBook, FaCalendarAlt } from 'react-icons/fa';
export default function RecentEnrollments({ enrollments = [] }) {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-50 pb-2">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Recent Enrollments
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Student activity tracking log
        </p>
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Header */}
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-4.5 px-6">Student</th>
                <th className="py-4.5 px-6">Email Address</th>
                <th className="py-4.5 px-6">Enrolled Course</th>
                <th className="py-4.5 px-6 text-right">Enrollment Date</th>
              </tr>
            </thead>
            {/* Body */}
            <tbody className="divide-y divide-slate-50 text-xs font-semibold text-darkGray">
              {enrollments.slice(0, 5).map((item, idx) => (
                <tr 
                  key={item.id || idx} 
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  {/* Student */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center space-x-2 font-bold text-darkGray">
                      <div className="w-6.5 h-6.5 rounded-lg bg-blue-50 text-primary flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        {item.student_name ? item.student_name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <span className="truncate max-w-[120px]">{item.student_name}</span>
                    </span>
                  </td>
                  
                  {/* Email */}
                  <td className="py-4 px-6 text-slate-450 font-normal">
                    <span className="inline-flex items-center space-x-1.5">
                      <FaEnvelope className="w-3.5 h-3.5 text-slate-300" />
                      <span className="truncate max-w-[150px]">{item.student_email}</span>
                    </span>
                  </td>
                  
                  {/* Course Name */}
                  <td className="py-4 px-6 font-bold text-slate-500">
                    <span className="inline-flex items-center space-x-1.5">
                      <FaBook className="w-3.5 h-3.5 text-slate-300" />
                      <span className="truncate max-w-[180px]">{item.course_title}</span>
                    </span>
                  </td>
                  
                  {/* Date */}
                  <td className="py-4 px-6 text-right text-slate-400 font-medium">
                    <span className="inline-flex items-center space-x-1.5 justify-end">
                      <FaCalendarAlt className="w-3 h-3 text-slate-300 mr-1" />
                      <span>{formatDate(item.enrolled_at)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}