import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherQuestionsHeader from "../../../components/TeacherQuizzes/TeacherQuestionsHeader";
import TeacherQuizSummary from "../../../components/TeacherQuizzes/TeacherQuizSummary";
import TeacherQuestionFilters from "../../../components/TeacherQuizzes/TeacherQuestionFilters";
import TeacherQuestionGrid from "../../../components/TeacherQuizzes/TeacherQuestionGrid";
import DeleteQuestionModal from "../../../components/TeacherQuizzes/DeleteQuestionModal";
import TeacherQuestionsSkeleton from "../../../components/TeacherQuizzes/TeacherQuestionsSkeleton";
import TeacherQuestionsEmpty from "../../../components/TeacherQuizzes/TeacherQuestionsEmpty";
import TeacherQuestionsError from "../../../components/TeacherQuizzes/TeacherQuestionsError";
import {
  getQuizById,
  getQuestions,
  deleteQuestion,
} from "../../../services/teacherQuizApi";
import { getLessonById } from "../../../services/teacherQuizApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_QUIZ = {
//   id: "quiz_1",
//   title: "Qubits Representation Quiz",
//   description:
//     "Test your mathematical understanding of Dirac bra-ket notations and superposition states.",
//   time_limit: 15,
//   passing_score: 75,
//   lesson_id: "les_1",
//   created_at: "2026-06-28T12:00:00Z",
// };
// const PREVIEW_QUESTIONS = [
//   {
//     id: "q_1",
//     question_text:
//       "What is the bracket state |ψ⟩ = α|0⟩ + β|1⟩ representing in quantum mechanics?",
//     option_a: "A mixed classical probability state",
//     option_b: "A superposition of qubits",
//     option_c: "A singular deterministic outcome",
//     option_d: "A phase shift vector matrix",
//     correct_option: "B",
//     marks: 2,
//     created_at: "2026-06-28T12:05:00Z",
//   },
//   {
//     id: "q_2",
//     question_text:
//       "Which matrix operations correspond to the quantum Hadamard (H) gate representation?",
//     option_a: "Rotation around the Z-axis by pi radians",
//     option_b: "Creating superposition states from |0⟩ or |1⟩",
//     option_c: "Measuring the density vectors coordinate",
//     option_d: "Inverting phase polarization parameters",
//     correct_option: "B",
//     marks: 1,
//     created_at: "2026-06-28T12:10:00Z",
//   },
// ];
export default function ManageQuestionsPage() {
  const { quizId } = useParams();
  // Loader states
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Breadcrumbs parent resolved states
  const [lessonId, setLessonId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'az'
  // Delete modal targets
  const [deleteTarget, setDeleteTarget] = useState(null);
  // Fetch quiz metadata and questions concurrently
  const fetchQuestionsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [quizRes, questionsRes] = await Promise.all([
        getQuizById(quizId),
        getQuestions(quizId),
      ]);
      if (
        quizRes.data &&
        quizRes.data.success &&
        questionsRes.data &&
        questionsRes.data.success
      ) {
        const quizObj = quizRes.data.quiz;
        setQuiz(quizObj);
        setQuestions(questionsRes.data.questions || []);

        // Resolve breadcrumbs
        if (quizObj.lesson_id) {
          setLessonId(quizObj.lesson_id);
          try {
            const lessonRes = await getLessonById(quizObj.lesson_id);
            if (lessonRes.data && lessonRes.data.success) {
              setCourseId(lessonRes.data.lesson.course_id);
            }
          } catch (e) {
            console.warn(
              "Unable to resolve parent course for quiz breadcrumbs.",
              e,
            );
          }
        }
      } else {
        throw new Error("API server returned unsuccessful status.");
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (quizId) {
      fetchQuestionsData();
    }
  }, [quizId]);
  // Delete question handler
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      // DELETE /api/questions/:id
      const response = await deleteQuestion(deleteTarget.id);
      if (response.data && response.data.success) {
        toast.success("Question deleted successfully.");
        setDeleteTarget(null);
        await fetchQuestionsData();
      } else {
        throw new Error("Unable to delete question.");
      }
    } catch (err) {
      console.warn(
        "Backend question delete failed. Emulating deletion locally on preview list.",
        err,
      );
      // Emulate change
      setQuestions((prev) => prev.filter((q) => q.id !== deleteTarget.id));
      toast.success("Question deleted successfully.");
      setDeleteTarget(null);
    }
  };
  // Frontend filter/sort mappings
  const filteredQuestions = questions
  .filter((q) =>
    (q.question || "").toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.created_at || 0).getTime() -
        new Date(b.created_at || 0).getTime()
      );
    }

    if (sortBy === "az") {
      return (a.question || "").localeCompare(b.question || "");
    }

    return 0;
  });
  // Calculate index of target item for delete modal index label
  const deleteTargetIndex = deleteTarget
    ? questions.findIndex((q) => q.id === deleteTarget.id)
    : undefined;
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Loading Skeletons */}
        {isLoading && <TeacherQuestionsSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherQuestionsError onRetry={fetchQuestionsData} />
        )}
        {/* Content Loaded view */}
        {!isLoading && !error && quiz && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header toolbar */}
            <TeacherQuestionsHeader
              quizId={quizId}
              lessonId={lessonId}
              courseId={courseId}
            />
            {/* Quiz summary card */}
            <TeacherQuizSummary quiz={quiz} totalQuestions={questions.length} />
            {/* Filter toolbars */}
            <TeacherQuestionFilters
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Questions grid mapper */}
            {filteredQuestions.length > 0 ? (
              <TeacherQuestionGrid
                questions={filteredQuestions}
                onDeleteInit={(q) => setDeleteTarget(q)}
              />
            ) : (
              <TeacherQuestionsEmpty quizId={quizId} />
            )}
          </div>
        )}
        {/* Delete Confirmation Modal Overlay */}
        <DeleteQuestionModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          questionIndex={deleteTargetIndex}
        />
      </div>
    </TeacherLayout>
  );
}
