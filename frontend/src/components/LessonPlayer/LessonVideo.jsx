import React from 'react';
import { FaPlayCircle, FaInfoCircle } from 'react-icons/fa';
export default function LessonVideo({ videoUrl, videoType }) {
  
  // Extract YouTube ID helper
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const youtubeId = videoType === 'youtube' ? getYoutubeId(videoUrl) : null;
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex-shrink-0">
      
      {/* 1. YouTube Embed */}
      {videoType === 'youtube' && youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : null}
      {/* 2. Cloudinary HTML5 Video */}
      {videoType === 'cloudinary' && videoUrl ? (
        <video
          src={videoUrl}
          controls
          controlsList="nodownload"
          className="w-full h-full object-cover"
        />
      ) : null}
      {/* 3. Fallback No Video */}
      {(!videoUrl || (videoType === 'youtube' && !youtubeId)) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900 space-y-4">
          <div className="p-4 bg-slate-800 rounded-2xl text-slate-500 border border-slate-700">
            <FaInfoCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-200">No Video Available</h4>
            <p className="text-xs text-slate-500 max-w-xs">This lesson does not contain an active video stream link.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
