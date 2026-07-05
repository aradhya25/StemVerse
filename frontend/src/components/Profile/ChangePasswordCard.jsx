import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaKey, FaSpinner } from 'react-icons/fa';
export default function ChangePasswordCard({ onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Show/Hide visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};
    if (!currentPassword) {
      tempErrors.current = 'Current password is required.';
    }
    if (!newPassword) {
      tempErrors.new = 'New password is required.';
    } else if (newPassword.length < 6) {
      tempErrors.new = 'Password must be at least 6 characters.';
    }
    if (!confirmPassword) {
      tempErrors.confirm = 'Confirm password is required.';
    } else if (confirmPassword !== newPassword) {
      tempErrors.confirm = 'Passwords do not match.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const success = await onSubmit({
      currentPassword,
      newPassword,
      confirmPassword
    });
    
    setIsSubmitting(false);
    if (success) {
      // Clear fields on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Change Password
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Update your secure login credentials
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (errors.current) setErrors((prev) => ({ ...prev, current: null }));
              }}
              placeholder="••••••••"
              disabled={isSubmitting}
              className={`w-full pl-4 pr-11 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                errors.current ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500"
            >
              {showCurrent ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.current && (
            <p className="text-[10px] text-red-500 font-bold">{errors.current}</p>
          )}
        </div>
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.new) setErrors((prev) => ({ ...prev, new: null }));
              }}
              placeholder="••••••••"
              disabled={isSubmitting}
              className={`w-full pl-4 pr-11 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                errors.new ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500"
            >
              {showNew ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.new && (
            <p className="text-[10px] text-red-500 font-bold">{errors.new}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirm) setErrors((prev) => ({ ...prev, confirm: null }));
              }}
              placeholder="••••••••"
              disabled={isSubmitting}
              className={`w-full pl-4 pr-11 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
                errors.confirm ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500"
            >
              {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-[10px] text-red-500 font-bold">{errors.confirm}</p>
          )}
        </div>
        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
  type="submit"
  disabled={isSubmitting}
  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/40 active:translate-y-0 disabled:pointer-events-none"
>
  {isSubmitting ? (
    <>
      <FaSpinner className="animate-spin w-3.5 h-3.5" />
      <span>Updating...</span>
    </>
  ) : (
    <>
      <FaKey className="w-3.5 h-3.5" />
      <span>Change Password</span>
    </>
  )}
</button>
        </div>
      </form>
    </div>
  );
}