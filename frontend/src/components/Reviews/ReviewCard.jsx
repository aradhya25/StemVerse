import React from 'react';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
export default function ReviewCard({ reviewItem, isOwnReview = false, onEdit, onDelete }) {
  if (!reviewItem) return null;
  const { id, name, rating, review, created_at } = reviewItem;
  // Star Rating Helper
  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`w-3.5 h-3.5 ${
            i <= count ? 'text-yellow-500' : 'text-slate-200'
          }`} 
        />
      );
    }
    return stars;
  };
  // Format Date Helper
  const formatDate = (dateStr) => {
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
  // Get Avatar Initials
  const getInitials = (userName) => {
    if (!userName) return 'S';
    return userName.trim().charAt(0).toUpperCase();
  };
  // Avatar Background Color Helper
  const getAvatarBg = (char) => {
    const colors = [
      'bg-blue-500 text-white',
      'bg-green-500 text-white',
      'bg-yellow-500 text-white',
      'bg-purple-500 text-white',
      'bg-pink-500 text-white',
      'bg-indigo-500 text-white',
      'bg-teal-500 text-white'
    ];
    const index = char.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const initial = getInitials(name);
  const avatarClass = getAvatarBg(initial);
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      onDelete(id);
    }
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex items-start gap-4">
      
      {/* User Avatar */}
      <div className={`w-10 h-10 rounded-2xl ${avatarClass} flex items-center justify-center font-black text-sm select-none flex-shrink-0 shadow-sm`}>
        {initial}
      </div>
      {/* Content Details */}
      <div className="flex-1 min-w-0 space-y-2.5">
        
        {/* Name and Rating header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-extrabold text-darkGray truncate">
                {name}
              </h4>
              {isOwnReview && (
                <span className="bg-primary/10 text-primary text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  You
                </span>
              )}
            </div>
            
            {/* Stars row */}
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
            </div>
          </div>
          {/* Date / Edit actions */}
          <div className="flex items-center space-x-3.5 text-[10px] text-slate-400 font-bold self-start sm:self-auto flex-shrink-0">
            <span>{formatDate(created_at)}</span>
            {isOwnReview && (
              <div className="flex items-center space-x-2 border-l border-slate-150 pl-3">
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(reviewItem)}
                  className="p-1 hover:text-primary transition-colors flex items-center space-x-1"
                  title="Edit Review"
                >
                  <FaEdit className="w-3.5 h-3.5" />
                </button>
                {/* Delete Button */}
                <button
                  onClick={handleDeleteClick}
                  className="p-1 hover:text-red-500 transition-colors flex items-center space-x-1"
                  title="Delete Review"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Review Text content */}
        <p className="text-xs text-darkGray-light font-normal leading-relaxed whitespace-pre-line">
          {review}
        </p>
      </div>
    </div>
  );
}
