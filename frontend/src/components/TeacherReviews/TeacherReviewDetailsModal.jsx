import React from 'react';
import { FaTimes, FaStar, FaRegStar, FaEnvelope, FaBookOpen, FaUser, FaCalendarAlt, FaCommentAlt } from 'react-icons/fa';
export default function TeacherReviewDetailsModal({ isOpen = false, onClose, review = {} }) {
  if (!isOpen || !review) return null;
  const renderStars = (rating = 0) => {
    const stars = [];
    const numRating = parseInt(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-500 flex-shrink-0" />);
      } else {
        stars.push(<FaRegStar key={i} className="w-5 h-5 text-slate-200 flex-shrink-0" />);
      }
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Container Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full border border-slate-100 shadow-2xl space-y-6 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-darkGray transition-all z-10"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        {/* Header Title section */}
        <div className="space-y-1.5 border-b border-slate-50 pb-4 pr-6">
          <span className="text-[10px] font-black uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded">
            Review Details
          </span>
          <h3 className="text-base font-black text-darkGray font-sans mt-1">
            Student Feedback Review
          </h3>
        </div>
        {/* Content details grid */}
        <div className="space-y-4 text-xs font-semibold text-slate-600">
          
          {/* Section: Student Profile */}
          <div className="bg-[#F8FAFC]/60 rounded-2xl p-4 border border-slate-100/80 space-y-3">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
              Student Details
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center space-x-2.5 min-w-0">
                <FaUser className="w-4 h-4 text-slate-350 flex-shrink-0" />
                <div className="min-w-0 leading-none">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Name</p>
                  <p className="font-extrabold text-darkGray truncate">{review.student_name || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 min-w-0">
                <FaEnvelope className="w-4 h-4 text-slate-350 flex-shrink-0" />
                <div className="min-w-0 leading-none">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Email</p>
                  <p className="font-medium text-slate-500 truncate">{review.student_email || '—'}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Section: Course & Rating stats */}
          <div className="bg-[#F8FAFC]/60 rounded-2xl p-4 border border-slate-100/80 space-y-4.5">
            
            <div className="flex items-start space-x-2.5">
              <FaBookOpen className="w-4 h-4 text-slate-350 mt-0.5 flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-[9px] text-slate-400 font-bold uppercase">Reviewed Course</p>
                <p className="font-extrabold text-darkGray">{review.course_title || '—'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <div className="p-1 bg-yellow-50 border border-yellow-100/50 rounded-lg text-yellow-500 mt-0.5 flex-shrink-0">
                <FaStar className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight space-y-1.5">
                <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Student Rating Score</p>
                {renderStars(review.rating)}
              </div>
            </div>
          </div>
          {/* Section: Written feedback */}
          <div className="bg-[#F8FAFC]/60 rounded-2xl p-4 border border-slate-100/80 space-y-3">
            <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
              <FaCommentAlt className="w-3 h-3" />
              <span>Written Feedback</span>
            </h4>
            <p className="text-xs text-darkGray-light font-medium leading-relaxed bg-white border border-slate-50 rounded-xl p-3.5 whitespace-pre-wrap">
              {review.review || 'No written comments submitted.'}
            </p>
          </div>
          {/* Date stamp footer */}
          <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold justify-start pt-2 px-1">
            <FaCalendarAlt className="w-3.5 h-3.5 text-slate-350" />
            <span>Submitted Stamp: {formatDate(review.created_at)}</span>
          </div>
        </div>
        {/* Modal Footer action button */}
        <div className="pt-2 border-t border-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
}