import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
export default function SubmitModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-6 animate-scaleUp">
        
        {/* Decorative Alert Icon */}
        <div className="p-4 bg-blue-50 text-primary rounded-2xl">
          <FaQuestionCircle className="w-8 h-8" />
        </div>
        {/* Text descriptions */}
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-darkGray font-sans">
            Submit Quiz?
          </h3>
          <p className="text-xs text-darkGray-light font-normal leading-relaxed">
            Are you sure you want to submit your quiz? You will not be able to change your answers after submission.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 hover:border-slate-350 text-darkGray font-bold rounded-xl text-xs transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-750 hover:to-blue-800 text-white font-extrabold rounded-xl text-xs shadow-md shadow-primary/10 transition-all active:scale-95"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}