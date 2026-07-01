import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../../../components/TeacherDashboard/TeacherLayout";
import TeacherCoursesHeader from "../../../components/TeacherCourses/TeacherCourseHeader";
import TeacherCourseStats from "../../../components/TeacherCourses/TeacherCourseStats";
import TeacherCourseFilters from "../../../components/TeacherCourses/TeacherCourseFilters";
import TeacherCourseGrid from "../../../components/TeacherCourses/TeacherCourseGrid";
import DeleteCourseModal from "../../../components/TeacherCourses/DeleteCourseModal";
import TeacherCoursesSkeleton from "../../../components/TeacherCourses/TeacherCoursesSkeleton";
import TeacherCoursesEmpty from "../../../components/TeacherCourses/TeacherCoursesEmpty";
import TeacherCoursesError from "../../../components/TeacherCourses/TeacherCoursesError";
import { getMyCourses, deleteCourse } from "../../../services/teacherCourseApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Fallback preview courses (Active only if backend APIs are not reachable)
const PREVIEW_COURSES = [
  {
    id: "course_1",
    title: "Introduction to Quantum Computing",
    description:
      "Understand superposition, qubits, quantum gates, and build quantum circuits using AI simulations. Complete course structure detailing concepts and logic gates.",
    language: "English",
    thumbnail: "/hero_illustration.jpg",
    created_at: "2026-05-15T08:00:00Z",
    students_count: 85,
    lessons_count: 12,
    quizzes_count: 8,
  },
  {
    id: "course_2",
    title: "AI-Powered Python & Robotics",
    description:
      "Learn Python from basics. Program actuators and robot components using deep learning simulation models.",
    language: "English",
    thumbnail: "/hero_illustration.jpg",
    created_at: "2026-06-10T12:00:00Z",
    students_count: 40,
    lessons_count: 10,
    quizzes_count: 6,
  },
  {
    id: "course_3",
    title: "Computational Algebra Foundations",
    description:
      "Deep dive into vectors, matrices, derivatives, and how they power neural network architectures.",
    language: "Hindi",
    thumbnail: "",
    created_at: "2026-04-20T10:30:00Z",
    students_count: 12,
    lessons_count: 5,
    quizzes_count: 4,
  },
];
export default function MyCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search & Filter state values
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'az' | 'students'
  // Delete Modal targets
  const [deleteTarget, setDeleteTarget] = useState(null);
  // 1. Fetch Courses API (GET /api/courses/my-courses)
  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyCourses();
      if (response.data && response.data.success) {
        setCourses(response.data.courses || []);
      } else {
        throw new Error("API server returned error status.");
      }
    } catch (err) {
      console.error(err);

      if (import.meta.env.DEV) {
        setCourses(PREVIEW_COURSES);
      } else {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  // 2. Delete Course handler
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      // DELETE /api/courses/:id
      const response = await deleteCourse(deleteTarget.id);
      if (response.data && response.data.success) {
        toast.success("Course deleted successfully.");
        setDeleteTarget(null);
        await fetchCourses();
      } else {
        throw new Error("Unable to delete course.");
      }
    } catch (err) {
      console.error(err);

      toast.error("Unable to delete course.");
    }
  };
  // 3. Frontend Filter & Sort Logic
  const filteredCourses = courses
    .filter((course) => {
      const matchesTitle = course.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesLanguage =
        language === "All" || course.language === language;
      return matchesTitle && matchesLanguage;
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
      if (sortBy === "students") {
        return (b.students_count || 0) - (a.students_count || 0);
      }
      return 0;
    });
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        {/* Toast Container */}
        {/* <ToastContainer
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
        /> */}
        {/* Loading Skeletons */}
        {isLoading && <TeacherCoursesSkeleton />}
        {/* Error warning overlay */}
        {!isLoading && error && <TeacherCoursesError onRetry={fetchCourses} />}
        {/* Loaded view */}
        {!isLoading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header section titles */}
            <TeacherCoursesHeader />
            {/* Courses Statistics */}
            {courses.length > 0 && <TeacherCourseStats courses={courses} />}
            {/* Filters Row */}
            <TeacherCourseFilters
              search={search}
              setSearch={setSearch}
              language={language}
              setLanguage={setLanguage}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {/* Grid display */}
            {filteredCourses.length > 0 ? (
              <TeacherCourseGrid
                courses={filteredCourses}
                onDeleteInit={(course) => setDeleteTarget(course)}
                onEdit={(course) =>
                  navigate(`/teacher/course/edit/${course.id}`)
                }
                onLessons={(course) =>
                  navigate(`/teacher/course/${course.id}/lessons`)
                }
                onReviews={(course) =>
                  navigate(`/teacher/course/${course.id}/reviews`)
                }
              />
            ) : (
              <TeacherCoursesEmpty />
            )}
          </div>
        )}
        {/* Delete Confirmation Modal Overlay */}
        <DeleteCourseModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          courseTitle={deleteTarget?.title}
        />
      </div>
    </TeacherLayout>
  );
}
