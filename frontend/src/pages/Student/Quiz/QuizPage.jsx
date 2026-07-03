import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import QuizHeader from "../../../components/Quiz/QuizHeader";
import QuizProgress from "../../../components/Quiz/QuizProgress";
import QuestionCard from "../../../components/Quiz/QuestionCard";
import QuizNavigation from "../../../components/Quiz/QuizNavigation";
import SubmitModal from "../../../components/Quiz/SubmitModal";
import QuizResultModal from "../../../components/Quiz/QuizResultModal";
import QuizSkeleton from "../../../components/Quiz/QuizSkeleton";
import EmptyQuiz from "../../../components/Quiz/EmptyQuiz";
import {
  getQuizByLesson,
  getQuestions,
  submitQuiz,
} from "../../../services/quizApi";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_QUIZ = {
//   id: "q_101",
//   lesson_id: "101",
//   title: "Quantum Superposition & Qubits Quiz",
//   description: "Evaluate your comprehension of Bloch sphere coordinates, Hadamard transforms, and qubit superpositions."
// };
// const PREVIEW_QUESTIONS = [
//   {
//     id: "qst_1",
//     question: "Which primary property distinguishes a qubit from a classical computer bit?",
//     option_a: "A qubit is built using silicon transistors only.",
//     option_b: "A qubit can reside in a coherent superposition of both |0⟩ and |1⟩ states.",
//     option_c: "A qubit operates at extremely high temperature points.",
//     option_d: "Qubits are strictly limited to binary logical states."
//   },
//   {
//     id: "qst_2",
//     question: "Which quantum logic gate is used to transform a base |0⟩ state into an equal superposition?",
//     option_a: "Pauli-X (Not) Gate",
//     option_b: "Hadamard (H) Gate",
//     option_c: "Controlled-NOT (CNOT) Gate",
//     option_d: "Phase Shift (Z) Gate"
//   },
//   {
//     id: "qst_3",
//     question: "On the Bloch Sphere representation, which qubit vector state represents the North Pole?",
//     option_a: "State |0⟩",
//     option_b: "State |1⟩",
//     option_c: "State |+⟩",
//     option_d: "State |i⟩"
//   }
// ];
export default function QuizPage() {
  const { lessonId } = useParams();
const navigate=useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [answers, setAnswers] = useState({});

  // Modals States
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [empty, setEmpty] = useState(false);

  // Submission Score Result States
  const [scoreResult, setScoreResult] = useState({ score: 0, total: 0 });
  // 1. Fetch Quiz and Questions API
  // const fetchQuizData = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   setEmpty(false);
  //   try {
  //     // BACKEND CONNECTION: GET /quizzes/lesson/:lessonId
  //     // const quizRes = await axios.get(`/quizzes/lesson/${lessonId}`);
  //     const quizResponse = await fetch(`/api/quizzes/lesson/${lessonId}`);
  //     if (!quizResponse.ok) {
  //       throw new Error('API failed to load quiz meta info.');
  //     }
  //     const quizData = await quizResponse.json();

  //     if (quizData.success && quizData.quiz) {
  //       setQuiz(quizData.quiz);
  //       // BACKEND CONNECTION: GET /quizzes/:quizId/questions
  //       // const qstRes = await axios.get(`/quizzes/${quizData.quiz.id}/questions`);
  //       const qstResponse = await fetch(`/api/quizzes/${quizData.quiz.id}/questions`);
  //       if (!qstResponse.ok) {
  //         throw new Error('API failed to load quiz questions.');
  //       }
  //       const qstData = await qstResponse.json();

  //       if (qstData.success && qstData.questions && qstData.questions.length > 0) {
  //         setQuestions(qstData.questions);
  //       } else {
  //         setEmpty(true);
  //       }
  //     } else {
  //       setEmpty(true);
  //     }
  //   } catch (err) {
  //     console.warn("Backend API not reachable. Using fallback preview mock for development evaluation.", err);

  //     // FALLBACK Demo loader: (If lessonId is 101/102/103/202, load preview, else show empty)
  //     if (["101", "102", "103", "202"].includes(lessonId)) {
  //       setQuiz(PREVIEW_QUIZ);
  //       setQuestions(PREVIEW_QUESTIONS);
  //     } else {
  //       setEmpty(true);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
 useEffect(() => {
  const fetchQuiz = async () => {
    try {
      setLoading(true);

      const quizRes = await getQuizByLesson(lessonId);

      console.log("Quiz Response:", quizRes.data);

      const quizzes = quizRes.data.quizzes || [];

      // No quiz available
      if (quizzes.length === 0) {
        setEmpty(true);
        return;
      }

      // For now, use the first quiz
      const selectedQuiz = quizzes[0];

      setQuiz(selectedQuiz);

      const questionRes = await getQuestions(selectedQuiz.id);

      setQuestions(questionRes.data.questions || []);

      if (questionRes.data.questions.length === 0) {
        setEmpty(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchQuiz();
}, [lessonId]);
  // 2. Navigation Actions
  const handleSelectAnswer = (optionKey) => {
    const currentQuestion = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey,
    }));
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  // 3. Submit Action (Trigger Confirmation Dialog)
  const handleSubmitTrigger = () => {
    setIsSubmitOpen(true);
  };
  const handleConfirmSubmit = async () => {
    try {
      setLoading(true);

      setIsSubmitOpen(false);

      const payload = {
        answers: Object.entries(answers).map(
          ([question_id, selected_answer]) => ({
            question_id,
            selected_answer,
          }),
        ),
      };

      const res = await submitQuiz(quiz.id, payload);

      setScoreResult({
        score: res.data.score,
        total: res.data.total_questions,
      });

      setIsResultOpen(true);
    } catch (err) {
      console.error(err);
      alert("Quiz submission failed.");
    } finally {
      setLoading(false);
    }
  };
  // 4. Modal Navigation Routes
  const handleBackToLesson = () => {
  setIsResultOpen(false);
  navigate(`/student/lesson/${lessonId}`);
};
  const handleViewHistory = () => {
  setIsResultOpen(false);

  navigate("/student/quiz-history", { replace: true });
};
  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-8 relative">
        {/* Loading / Skeleton State */}
        {Loading && <QuizSkeleton />}
        {/* Empty State */}
        {!Loading && empty && <EmptyQuiz lessonId={lessonId} />}
        {/* Error State */}
        {!Loading && !empty && error && (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium text-center space-y-6 max-w-md mx-auto">
            <div className="p-4 bg-red-50 text-red-500 rounded-2xl inline-block">
              <FaExclamationTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-darkGray">
                Quiz Error
              </h3>
              <p className="text-xs text-slate-400">
                Failed to load the requested quiz content from the server.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <FaRedo className="w-3 h-3" />
              <span>Retry Attempt</span>
            </button>
          </div>
        )}
        {/* Active Quiz Content Frame */}
        {!Loading && !empty && !error && quiz && questions.length > 0 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header section */}
            <QuizHeader
              title={quiz.title}
              description={quiz.description}
              lessonId={lessonId}
            />
            {/* Progress status */}
            <QuizProgress
              currentIndex={currentIndex}
              totalIndex={questions.length}
            />
            {/* Question body card */}
            <QuestionCard
              questionData={questions[currentIndex]}
              selectedAnswer={answers[questions[currentIndex].id] || null}
              onSelectAnswer={handleSelectAnswer}
            />
            {/* <pre>{JSON.stringify(answers, null, 2)}</pre> */}
            {/* Nav bottom controls */}
            <QuizNavigation
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={handleSubmitTrigger}
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
              hasAnswered={!!answers[questions[currentIndex].id]}
            />
            {/* Submit Confirmation Dialog Overlay */}
            <SubmitModal
              isOpen={isSubmitOpen}
              onClose={() => setIsSubmitOpen(false)}
              onConfirm={handleConfirmSubmit}
            />
            {/* Performance Statistics Modal Overlay */}
            <QuizResultModal
              isOpen={isResultOpen}
              score={scoreResult.score}
              total={scoreResult.total}
              onBackToLesson={handleBackToLesson}
              onViewHistory={handleViewHistory}
            />
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
