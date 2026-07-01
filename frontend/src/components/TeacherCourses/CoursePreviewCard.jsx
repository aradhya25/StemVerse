import React from "react";
import { FaLanguage, FaUser, FaRegEye } from "react-icons/fa";
export default function CoursePreviewCard({
  title,
  description,
  language,
  thumbnail,
}) {
  // Checks if thumbnail url is valid string
  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  const previewThumbnail = isValidUrl(thumbnail) ? thumbnail : null;
  return (
    <div className="space-y-4">
      {/* Visual Anchor Indicator */}
      <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider select-none">
        <FaRegEye className="w-3.5 h-3.5" />
        <span>Live Preview</span>
      </div>
      {/* Premium Course Preview Card Container */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-premium hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[360px]">
        <div className="space-y-4">
          {/* Thumbnail / Gradient Placeholder */}
          <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-slate-100 overflow-hidden relative flex items-center justify-center flex-shrink-0 select-none">
            {previewThumbnail ? (
              <img
                src={thumbnail || "/placeholder-course.png"}
                alt="Course Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-course.png";
                }}
              />
            ) : (
              <span className="text-4xl animate-pulse">📚</span>
            )}
            {/* Language Badge */}
            <span className="absolute top-3 right-3 inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-primary text-[8px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-slate-100/50">
              <FaLanguage className="w-3 h-3" />
              <span>{language || "English"}</span>
            </span>
          </div>
          {/* Title and descriptions */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-darkGray line-clamp-1 leading-tight transition-colors">
              {title || "Untitled Course"}
            </h4>

            <p className="text-xs text-darkGray-light font-normal leading-relaxed line-clamp-2 min-h-[2.5rem] whitespace-pre-line">
              {description ||
                "Write a detailed course description to preview it here."}
            </p>
          </div>
        </div>
        {/* Creator label footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400">
          <span className="inline-flex items-center space-x-1.5 bg-slate-55 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            <FaUser className="w-3 h-3 text-slate-350 mr-1" />
            <span>Created by You</span>
          </span>

          <span className="text-[9px] uppercase font-bold text-slate-400">
            Draft
          </span>
        </div>
      </div>
    </div>
  );
}
