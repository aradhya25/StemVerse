import React from 'react';
export default function ProfileHeader({ user }) {
  const name = user?.name || '';
  
  const getInitials = (userName) => {
    if (!userName) return 'S';
    return userName.trim().charAt(0).toUpperCase();
  };
  const getAvatarBg = (char) => {
    const colors = [
      'bg-gradient-to-tr from-blue-500 to-indigo-650 text-white',
      'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white',
      'bg-gradient-to-tr from-indigo-500 to-purple-650 text-white',
      'bg-gradient-to-tr from-pink-500 to-rose-600 text-white'
    ];
    const index = char.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const initial = getInitials(name);
  const avatarClass = getAvatarBg(initial);
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium flex flex-col sm:flex-row items-center gap-6">
      
      {/* User Avatar Circle */}
      <div className={`w-20 h-20 rounded-3xl ${avatarClass} flex items-center justify-center font-black text-3xl select-none flex-shrink-0 shadow-lg shadow-primary/10 border border-white/10 animate-scaleUp`}>
        {initial}
      </div>
      {/* Greeting info */}
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl font-extrabold text-darkGray tracking-tight leading-tight font-sans">
          {user?.name}
        </h1>
        <p className="text-sm text-darkGray-light font-medium mt-1 leading-relaxed">
          Manage your account information and password.
        </p>
      </div>
    </div>
  );
}