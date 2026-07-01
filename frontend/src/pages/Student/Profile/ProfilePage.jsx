import React, { useState, useEffect } from "react";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ProfileInfoCard from "../../../components/Profile/ProfileInfoCard";
import EditProfileCard from "../../../components/Profile/EditProfileCard";
import ChangePasswordCard from "../../../components/Profile/ChangePasswordCard";
import ProfileSkeleton from "../../../components/Profile/ProfileSkeleton";
import ProfileError from "../../../components/Profile/ProfileError";
import { useAuth } from "../../../context/AuthContext";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../../services/userApi";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_USER = {
//   id: "usr_101",
//   name: "Aradhya Kulkarni",
//   email: "abc@gmail.com",
//   role: "student",
//   created_at: "2026-06-28T12:30:20.000Z"
// };
export default function ProfilePage() {
  const { refreshUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);
  // Success Toast Panel States
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };
  // 1. Fetch Profile Data (GET /api/users/profile)
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      if (response.data && response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error("API return unsuccessful.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load profile.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  // 2. Update Profile Name (PUT /api/users/profile)
  const handleUpdateProfile = async ({ name }) => {
    try {
      const response = await updateProfile({ name });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        triggerToast("Profile updated successfully!");
      } else {
        throw new Error("Update failed.");
      }
    } catch (err) {
      console.warn(
        "Backend update failed. Emulating profile update locally.",
        err,
      );
      // Emulate change
      const response = await updateProfile({ name });

      setUser(response.data.user);

      // Refresh the global user stored in AuthContext
      await refreshUser();

      triggerToast("Profile updated successfully!");
    }
  };
  // 3. Change Password (PUT /api/users/change-password)
  const handleChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (response.data && response.data.success) {
        triggerToast("Password changed successfully!");
        return true;
      } else {
        throw new Error(response.data.message || "Password update failed.");
      }
    } catch (err) {
      triggerToast(
        err.response?.data?.message || "Password change failed",
        "error",
      );

      return false;
    }
  };
  return (
    <StudentLayout>
      <div className="space-y-8 relative">
        {/* Dynamic Success/Error Toast notification */}
        {toast.show && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold animate-bounce ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <FaCheckCircle className="w-5 h-5 text-secondary" />
            ) : (
              <FaExclamationCircle className="w-5 h-5 text-red-500" />
            )}
            <span>{toast.message}</span>
          </div>
        )}
        {/* Loading Skeletons */}
        {isLoading && <ProfileSkeleton />}
        {/* Loading Error */}
        {!isLoading && error && <ProfileError onRetry={fetchProfile} />}
        {/* Content Loaded */}
        {!isLoading && !error && user && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header details */}
            <ProfileHeader user={user} />
            {/* Read-Only information cards */}
            <ProfileInfoCard user={user} />
            {/* Edit Profile & Password Cards (split columns desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Edit Profile name */}
              <EditProfileCard
                loading={savingProfile}
                user={user}
                onSave={handleUpdateProfile}
              />
              {/* Password update form */}
              <ChangePasswordCard
                loading={changingPassword}
                onSubmit={handleChangePassword}
              />
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
