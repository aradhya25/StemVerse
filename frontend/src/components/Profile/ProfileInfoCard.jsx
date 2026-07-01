import React from 'react';
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
export default function ProfileInfoCard({ user }) {
  const { name, email, role, created_at } = user || {};
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };
  const infoItems = [
    {
      label: 'Full Name',
      value: name || 'Student Profile',
      icon: <FaUser className="w-4 h-4 text-primary" />,
      bg: 'bg-blue-50/70',
    },
    {
      label: 'Email Address',
      value: email || 'No email associated',
      icon: <FaEnvelope className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-green-50/70',
    },
    {
      label: 'Account Role',
      value: role || 'Student',
      icon: <FaGraduationCap className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50/70',
    },
    {
      label: 'Member Since',
      value: formatDate(created_at),
      icon: <FaCalendarAlt className="w-4 h-4 text-yellow-600" />,
      bg: 'bg-yellow-50/70',
    }
  ];
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Profile Information
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Verify your registered account profile details
        </p>
      </div>
      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100/50">
            <div className={`p-3 rounded-xl flex-shrink-0 ${item.bg}`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                {item.label}
              </span>
              <p className="text-sm font-extrabold text-darkGray truncate">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}