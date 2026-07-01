import React, { useState, useEffect } from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';
export default function EditProfileCard({ user, onSave }) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  // Sync details on mount or user changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSaving(true);
    await onSave({ name });
    setIsSaving(false);
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Edit Profile
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Update your public profile display name
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            disabled={isSaving}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75"
          />
        </div>
        {/* Email input (disabled) */}
        <div className="space-y-1.5 opacity-60">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Email Address (Disabled)
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-100 text-slate-450 cursor-not-allowed select-none"
          />
        </div>
        {/* Role input (disabled) */}
        <div className="space-y-1.5 opacity-60">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Account Role (Disabled)
          </label>
          <input
            type="text"
            value={user?.role || 'Student'}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-100 text-slate-455 cursor-not-allowed select-none capitalize"
          />
        </div>
        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving || !name.trim() || name === user?.name}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3.5 px-6 bg-gradient-to-r from-primary to-blue-750 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
          >
            {isSaving ? (
              <>
                <FaSpinner className="animate-spin w-3.5 h-3.5" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FaSave className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
