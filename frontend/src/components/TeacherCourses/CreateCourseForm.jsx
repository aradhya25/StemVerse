import React from "react";
import { FaSave, FaSpinner, FaTimes } from "react-icons/fa";
export default function CreateCourseForm({
  title,
  setTitle,
  description,
  setDescription,
  language,
  setLanguage,
  thumbnail,
  setThumbnail,
  errors = {},
  loading = false,
  onSubmit,
  onCancel,
}) {
  const titleLimit = 100;
  const descLimit = 1000;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6 animate-fadeIn">
      <div className="border-b border-slate-50 pb-4">
        <h3 className="text-base font-extrabold text-darkGray font-sans">
          Course Specifications
        </h3>
        <p className="text-[10px] text-slate-455 font-bold uppercase tracking-wider">
          Provide key metadata descriptors to configure your course
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Course Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Course Title *</span>
            <span className="text-slate-400">
              {title.length} / {titleLimit}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleLimit))}
            placeholder="Enter course title"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 ${
              errors.title
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-500 font-bold">{errors.title}</p>
          )}
        </div>
        {/* 2. Description Textarea */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">Description *</span>
            <span className="text-slate-400">
              {description.length} / {descLimit}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, descLimit))}
            placeholder="Write a detailed course description..."
            rows="5"
            disabled={loading}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 resize-none ${
              errors.description
                ? "border-red-400 focus:border-red-500"
                : "border-slate-200 focus:border-primary"
            }`}
          />
          {errors.description && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.description}
            </p>
          )}
        </div>
        {/* 3. Language Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Language *
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm transition-all bg-[#F8FAFC] focus:bg-white disabled:opacity-75 cursor-pointer appearance-none ${
                errors.language
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-primary"
              }`}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
          {errors.language && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.language}
            </p>
          )}
        </div>
        {/* 4. Thumbnail URL Input */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Course Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setThumbnail(file);
              }
            }}
            className={`w-full rounded-xl border px-4 py-3 bg-[#F8FAFC]
      ${errors.thumbnail ? "border-red-400" : "border-slate-200"}`}
          />

          <p className="text-[10px] text-slate-400">
            JPG, PNG or WEBP (Maximum 5 MB)
          </p>

          {errors.thumbnail && (
            <p className="text-[10px] text-red-500 font-bold">
              {errors.thumbnail}
            </p>
          )}
        </div>
        {/* Action Triggers row */}
        <div className="flex items-center justify-end space-x-3.5 pt-4 border-t border-slate-50">
          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`py-3 px-5 border rounded-xl text-xs font-bold transition-all
${
  loading
    ? "opacity-50 cursor-not-allowed"
    : "hover:border-slate-400 hover:bg-slate-50"
}`}
          >
            Cancel
          </button>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-primary to-blue-750 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin w-3.5 h-3.5" />
                <span>Creating Course...</span>
              </>
            ) : (
              <>
                <FaSave className="w-3.5 h-3.5" />
                <span>Create Course</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
