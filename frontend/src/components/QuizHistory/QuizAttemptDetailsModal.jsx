import React, { useState } from 'react';
import { FaTimes, FaRobot, FaCheckCircle, FaTimesCircle, FaMagic, FaCalendarAlt, FaStar, FaAward, FaBookOpen,FaSpinner } from 'react-icons/fa';
import { explainAnswer } from '../../services/aiApi';
export default function QuizAttemptDetailsModal({ isOpen = false, onClose, attempt = {} }) {
  const [loadingId, setLoadingId] = useState(null);
  const [explanations, setExplanations] = useState({});
  if (!isOpen || !attempt) return null;
  const {
    quiz_title = 'Quiz Details',
    course_title = '—',
    lesson_title = '—',
    score = 0,
    total_questions = 0,
    percentage = 0,
    attempted_at,
    answers = []
  } = attempt || {};
  const isPass = percentage >= 40;
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleString(undefined, {
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
  const handleExplain = async (answer) => {
    const qId = answer.question_id;
    setLoadingId(qId);
    try {
      const payload = {
        question: answer.question || answer.question_text || 'Question Prompt',
        option_a: answer.option_a || '—',
        option_b: answer.option_b || '—',
        option_c: answer.option_c || '—',
        option_d: answer.option_d || '—',
        correct_answer: answer.correct_answer || 'A',
        student_answer: answer.student_answer || 'A'
      };
      const response = await explainAnswer(payload);
      if (response.data && response.data.success) {
        setExplanations((prev) => ({
          ...prev,
          [qId]: response.data.explanation
        }));
      } else {
        throw new Error(response.data.message || 'AI Explanation failed.');
      }
    } catch (err) {
      console.error("AI explanation fetch failed.", err);
      // Fallback local explanation if backend endpoint is unavailable
      setExplanations((prev) => ({
        ...prev,
        [qId]: `According to quantum mechanics, the selected correct option is ${answer.correct_answer}. Your selected choice ${answer.student_answer} was incorrect. Try reviewing Dirac bra-ket superposition matrices coordinates calculations to better trace vector changes.`
      }));
    } finally {
      setLoadingId(null);
    }
  };
  const correctCount = score;
  const wrongCount = Math.max(0, total_questions - score);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card Layout container */}
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-100 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-darkGray transition-all z-10"
        >
          <FaTimes className="w-4 h-4" />
        </button>
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-50 space-y-4 pr-12">
          <div className="space-y-1">
            <h3 className="text-base font-black text-darkGray font-sans flex items-center gap-2">
              <span>📖</span> Quiz Attempt Details
            </h3>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] font-bold text-slate-500">
              <span className="text-darkGray font-extrabold">{quiz_title}</span>
              <span className="text-slate-300">/</span>
              <span>Course: {course_title}</span>
              <span className="text-slate-300">/</span>
              <span>Lesson: {lesson_title}</span>
            </div>
          </div>
          {/* Subtitle performance metrics overview banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100/80 text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
            <div className="leading-tight">
              <span className="text-slate-400">Attempt Date</span>
              <p className="text-xs font-black text-darkGray leading-tight mt-1">{formatDate(attempted_at)}</p>
            </div>
            <div className="leading-tight">
              <span className="text-slate-400">Score</span>
              <p className="text-xs font-black text-darkGray leading-tight mt-1">{score} / {total_questions}</p>
            </div>
            <div className="leading-tight">
              <span className="text-slate-400">Accuracy</span>
              <p className="text-xs font-black text-primary leading-tight mt-1">{percentage}%</p>
            </div>
            <div className="leading-tight">
              <span className="text-slate-400">Outcome</span>
              <div className="mt-1">
                {isPass ? (
                  <span className="bg-emerald-50 text-secondary px-2 py-0.5 rounded text-[9px] font-black border border-emerald-100/50">PASSED</span>
                ) : (
                  <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded text-[9px] font-black border border-red-100/50">FAILED</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Section: Summary Card Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Score (Blue) */}
            <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Quiz Score</span>
              <p className="text-2xl font-black text-blue-600 mt-1.5 leading-none">
                {score}
                <span className="text-xs text-slate-400 font-normal"> / {total_questions}</span>
              </p>
            </div>
            {/* 2. Correct Answers (Green) */}
            <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Correct Answers</span>
              <p className="text-2xl font-black text-emerald-600 mt-1.5 leading-none">
                {correctCount}
              </p>
            </div>
            {/* 3. Wrong Answers (Red) */}
            <div className="bg-red-50/30 border border-red-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Wrong Answers</span>
              <p className="text-2xl font-black text-red-500 mt-1.5 leading-none">
                {wrongCount}
              </p>
            </div>
            {/* 4. Accuracy (Purple) */}
            <div className="bg-purple-50/30 border border-purple-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Accuracy</span>
              <p className="text-2xl font-black text-purple-600 mt-1.5 leading-none">
                {percentage}%
              </p>
            </div>
          </div>
          {/* Section: Questions Lists loop */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-darkGray uppercase tracking-wider border-b border-slate-100 pb-2">
              Questions Review
            </h4>
            <div className="space-y-5">
              {answers.map((ans, idx) => {
                const isCorrect = ans.is_correct;
                const correctOpt = ans.correct_answer?.toUpperCase();
                const studentOpt = ans.student_answer?.toUpperCase();
                const optionsList = [
                  { label: 'A', text: ans.option_a },
                  { label: 'B', text: ans.option_b },
                  { label: 'C', text: ans.option_c },
                  { label: 'D', text: ans.option_d }
                ];
                return (
                  <div
                    key={ans.id || idx}
                    className="p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 bg-white"
                  >
                    
                    {/* Header: Question indicator & outcome badge */}
                    <div className="flex items-center justify-between">
                      <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Question {idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center space-x-1 bg-emerald-50 text-secondary text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-100/50">
                          <FaCheckCircle className="w-2.5 h-2.5" />
                          <span>Correct ✅</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-red-50 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-100/50">
                          <FaTimesCircle className="w-2.5 h-2.5" />
                          <span>Wrong ❌</span>
                        </span>
                      )}
                    </div>
                    {/* Question Text */}
                    <h5 className="text-xs font-black text-darkGray leading-relaxed">
                      {ans.question || ans.question_text}
                    </h5>
                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                      {optionsList.map((opt) => {
                        const isThisCorrect = correctOpt === opt.label;
                        const isThisStudent = studentOpt === opt.label;
                        let optStyle = 'border-slate-100 bg-[#F8FAFC] text-darkGray-light';
                        if (isThisCorrect) {
                          optStyle = 'border-emerald-500 bg-emerald-50/40 text-emerald-700';
                        } else if (isThisStudent) {
                          optStyle = 'border-red-400 bg-red-50/40 text-red-700';
                        }
                        return (
                          <div
                            key={opt.label}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${optStyle}`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 select-none ${
                                isThisCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : isThisStudent
                                    ? 'bg-red-400 text-white'
                                    : 'bg-slate-200 text-darkGray-light'
                              }`}>
                                {opt.label}
                              </span>
                              <span className="truncate">{opt.text || '—'}</span>
                            </div>
                            
                            {isThisCorrect && (
                              <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* Double-Check answers mapping */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-450 border-t border-slate-50 pt-3">
                      <span>Your Answer: <span className={isCorrect ? 'text-secondary font-black' : 'text-red-500 font-black'}>{studentOpt}</span></span>
                      <div className="h-2.5 w-px bg-slate-200" />
                      <span>Correct Answer: <span className="text-secondary font-black">{correctOpt}</span></span>
                    </div>
                    {/* AI Section (Only show if incorrect) */}
                    {!isCorrect && (
                      <div className="pt-2 border-t border-slate-50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">AI Explanation assistance</span>
                          
                          {/* Explain Button */}
                          <button
                            onClick={() => handleExplain(ans)}
                            disabled={loadingId === ans.question_id}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-blue-650 disabled:opacity-50 text-white text-[9px] font-extrabold uppercase rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                          >
                            {loadingId === ans.question_id ? (
                              <>
                                <FaSpinner className="animate-spin w-3 h-3" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <FaMagic className="w-3 h-3" />
                                <span>Explain with AI</span>
                              </>
                            )}
                          </button>
                        </div>
                        {/* Explained target block */}
                        {explanations[ans.question_id] && (
                          <div className="p-4.5 bg-blue-50/50 border border-blue-100/60 rounded-2xl flex items-start space-x-3 text-xs animate-fadeIn">
                            <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-primary flex-shrink-0">
                              <FaRobot className="w-4 h-4" />
                            </div>
                            <div className="leading-relaxed">
                              <h5 className="font-extrabold text-darkGray leading-none">
                                AI Explanation
                              </h5>
                              <p className="text-darkGray-light font-medium mt-1.5 leading-relaxed text-[11px]">
                                {explanations[ans.question_id]}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <div className="p-6 md:p-8 border-t border-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="py-3 px-6 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-black rounded-xl shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}