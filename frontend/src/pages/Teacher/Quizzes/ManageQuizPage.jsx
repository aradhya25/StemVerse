import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherQuizHeader from "../../../components/TeacherQuizzes/TeacherQuizHeader";
import TeacherLessonSummary from "../../../components/TeacherQuizzes/TeacherLessonSummary";
import TeacherQuizFilters from "../../../components/TeacherQuizzes/TeacherQuizFilters";
import TeacherQuizGrid from "../../../components/TeacherQuizzes/TeacherQuizGrid";
import DeleteQuizModal from "../../../components/TeacherQuizzes/DeleteQuizModal";
import TeacherQuizSkeleton from "../../../components/TeacherQuizzes/TeacherQuizSkeleton";
import TeacherQuizEmpty from "../../../components/TeacherQuizzes/TeacherQuizEmpty";
import TeacherQuizError from "../../../components/TeacherQuizzes/TeacherQuizError";
import {
  getLessonById,
  getQuizzes,
  deleteQuiz,
} from "../../../services/teacherQuizApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Fallback preview data (Active only if backend APIs are not reachable)
const PREVIEW_LESSON = {
  id: "les_1",
  title: "Introduction to Qubits & Superposition",
  description:
    "In this lesson you will learn the absolute basics of Qubits and Superposition math calculations.",
  course_id: "course_1",
  created_at: "2026-06-28T10:00:00Z",
};
const PREVIEW_QUIZZES = [
  {
    id: "quiz_1",
    title: "Qubits Representation Quiz",
    description:
      "Test your mathematical understanding of Dirac bra-ket notations and superposition states.",
    questions_count: 10,
    time_limit: 15,
    passing_score: 75,
    status: "published",
    created_at: "2026-06-28T12:00:00Z",
  },
  {
    id: "quiz_2",
    title: "Bloch Sphere & Operations Quiz",
    description:
      "Apply rotation logic matrices and outline coordinates vectors representation models.",
    questions_count: 8,
    time_limit: 10,
    passing_score: 70,
    status: "draft",
    created_at: "2026-06-29T10:30:00Z",
  },
];
export default function ManageQuizPage() {
  const { lessonId } = useParams();
  // Loader states
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'az'
  // Delete modal targets
  const [deleteTarget, setDeleteTarget] = useState(null);
  // Fetch lesson metadata and quizzes concurrently
  const fetchQuizzesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lessonRes, quizzesRes] = await Promise.all([
        getLessonById(lessonId),
        getQuizzes(lessonId),
      ]);
      console.log("Lesson Response:", lessonRes.data);
      console.log("Quiz Response:", quizzesRes.data);
      if (
        lessonRes.data &&
        lessonRes.data.success &&
        quizzesRes.data &&
        quizzesRes.data.success
      ) {
        setLesson(lessonRes.data.lesson);
        setQuizzes(quizzesRes.data.quizzes || []);
        
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
    if (lessonId) {
      fetchQuizzesData();
    }
  }, [lessonId]);
  // Delete quiz handler
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      // DELETE /api/quizzes/:id
      const response = await deleteQuiz(deleteTarget.id);
      if (response.data && response.data.success) {
        toast.success("Quiz deleted successfully.");
        setDeleteTarget(null);
        await fetchQuizzesData();
      } else {
        throw new Error("Unable to delete quiz.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Unable to delete quiz.");
    }
  };
  // Frontend filter/sort mappings
  const filteredQuizzes = quizzes
    .filter((quiz) => {
      return quiz.title.toLowerCase().includes(search.toLowerCase());
    })
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
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Toast Container */}

        {/* Loading Skeletons */}
        {isLoading && <TeacherQuizSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && <TeacherQuizError onRetry={fetchQuizzesData} />}
        {/* Content Loaded view */}
        {!isLoading && !error && lesson && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header toolbar */}
            <TeacherQuizHeader
              lessonId={lessonId}
              courseId={lesson.course_id}
            />
            {/* Lesson summary card */}
            <TeacherLessonSummary
              lesson={lesson}
              totalQuizzes={quizzes.length}
            />
            {/* Filter toolbars */}
            <TeacherQuizFilters
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Quizzes grid mapper */}
            {filteredQuizzes.length > 0 ? (
              <TeacherQuizGrid
                quizzes={filteredQuizzes}
                onDeleteInit={setDeleteTarget}
                lessonId={lessonId}
              />
            ) : (
              <TeacherQuizEmpty lessonId={lessonId} />
            )}
          </div>
        )}
        {/* Delete Confirmation Modal Overlay */}
        <DeleteQuizModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          quizTitle={deleteTarget?.title}
        />
      </div>
    </TeacherLayout>
  );
}
