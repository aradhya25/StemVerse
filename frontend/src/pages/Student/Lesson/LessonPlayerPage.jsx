import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import StudentLayout from "../../../components/StudDashboard/StudentLayout";
import LessonVideo from "../../../components/LessonPlayer/LessonVideo";
import LessonSidebar from "../../../components/LessonPlayer/LessonSidebar";
import LessonContent from "../../../components/LessonPlayer/LessonContent";
import LessonNavigation from "../../../components/LessonPlayer/LessonNavigation";
import LessonSkeleton from "../../../components/LessonPlayer/LessonSkeleton";
import { saveProgress } from "../../../services/progressApi";
import { getLessonById, getLessonsByCourse } from "../../../services/lessonApi";
import { generateLessonSummary } from "../../../services/aiApi";
import AiLessonSummaryCard from "../../../components/LessonPlayer/AiLessonSummaryCard";
// const MOCK_LESSON_DETAILS = {
//   "101": {
//     id: "101",
//     course_id: "1",
//     title: "Introduction to Qubits & Superposition",
//     content: "In this lesson you will explore the foundational principles of quantum computing. We define what a qubit is, how it differs from a classical bit, and examine the concept of quantum superposition using Bloch sphere visualizations.",
//     video_url: "https://www.youtube.com/watch?v=OWJCfOvoYMs",
//     video_type: "youtube",
//     order_no: 1,
//     created_at: "2026-05-15T08:00:00Z"
//   },
//   "102": {
//     id: "102",
//     course_id: "1",
//     title: "Understanding Quantum Logic Gates",
//     content: "Learn how quantum logic gates manipulate qubits. We examine the Pauli-X, Pauli-Y, Pauli-Z, Hadamard, and CNOT gates, tracing state shifts and transition matrices step-by-step.",
//     video_url: "https://www.youtube.com/watch?v=tBnWG_95F9c",
//     video_type: "youtube",
//     order_no: 2,
//     created_at: "2026-05-18T09:00:00Z"
//   },
//   "103": {
//     id: "103",
//     course_id: "1",
//     title: "Building Circuits with Qiskit",
//     content: "Get hands-on coding experience. We build a simple Bell state circuit using IBM Qiskit and simulate run results locally using Python code blocks.",
//     video_url: "https://www.youtube.com/watch?v=F_Riqjdh2oM",
//     video_type: "youtube",
//     order_no: 3,
//     created_at: "2026-05-20T10:00:00Z"
//   },
//   "201": {
//     id: "201",
//     course_id: "2",
//     title: "Setup and Python Basics",
//     content: "Complete setup guidelines for Python environments. Install libraries, define variables, and write standard actuator control loop protocols.",
//     video_url: "",
//     video_type: "youtube",
//     order_no: 1,
//     created_at: "2026-06-10T12:00:00Z"
//   },
//   "202": {
//     id: "202",
//     course_id: "2",
//     title: "Robotics Actuators & Controls",
//     content: "Explore robotics motor controls. Program pulse-width modulation (PWM) commands to control actuator speeds dynamically using Cloudinary HTML5 assets.",
//     video_url: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
//     video_type: "cloudinary",
//     order_no: 2,
//     created_at: "2026-06-15T14:00:00Z"
//   },
//   "301": {
//     id: "301",
//     course_id: "3",
//     title: "Vector Spaces and Matrices",
//     content: "Linear Algebra core concepts. Master vector additions, linear independence, dot products, and matrix transformations.",
//     video_url: "",
//     video_type: "youtube",
//     order_no: 1,
//     created_at: "2026-04-20T10:30:00Z"
//   }
// };
// const MOCK_COURSE_LESSONS = {
//   "1": [
//     { id: "101", title: "Introduction to Qubits & Superposition", order_no: 1 },
//     { id: "102", title: "Understanding Quantum Logic Gates", order_no: 2 },
//     { id: "103", title: "Building Circuits with Qiskit", order_no: 3 },
//   ],
//   "2": [
//     { id: "201", title: "Setup and Python Basics", order_no: 1 },
//     { id: "202", title: "Robotics Actuators & Controls", order_no: 2 },
//   ],
//   "3": [
//     { id: "301", title: "Vector Spaces and Matrices", order_no: 1 },
//   ]
// };
export default function LessonPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({});
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonRes = await getLessonById(id);

        console.log("Lesson:", lessonRes.data);

        setLesson(lessonRes.data.lesson);

        const courseId = lessonRes.data.lesson.course_id;

        const lessonsRes = await getLessonsByCourse(courseId);

        console.log("Course Lessons:", lessonsRes.data);

        setCourseLessons(lessonsRes.data.lessons);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [id]);
  const handleSelectLesson = (lessonId) => {
    navigate(`/student/lesson/${lessonId}`);
  };
  const handleToggleComplete = async () => {
    try {
      await saveProgress({
        lesson_id: lesson.id,
        watch_time: 100,
        completed: true,
      });

      setCompletedLessons((prev) => ({
        ...prev,
        [lesson.id]: true,
      }));

      // Automatically move to quiz after a short delay
      setTimeout(() => {
        navigate(`/student/quiz/${lesson.id}`);
      }, 800);

      // alert("Lesson marked as completed!");
    } catch (error) {
      console.error(error);
      alert("Failed to save progress.");
    }
  };
  const handleTakeQuiz = () => {
    navigate(`/student/quiz/${lesson.id}`);
  };
  const getSiblingLessonId = (offset) => {
    if (!lesson || courseLessons.length === 0) return null;
    const sorted = [...courseLessons].sort(
      (a, b) => (a.order_no || 0) - (b.order_no || 0),
    );
    const currentIndex = sorted.findIndex((l) => l.id === lesson.id);
    const targetIndex = currentIndex + offset;

    if (targetIndex >= 0 && targetIndex < sorted.length) {
      return sorted[targetIndex].id;
    }
    return null;
  };
  const prevLessonId = getSiblingLessonId(-1);
  const nextLessonId = getSiblingLessonId(1);
  const handleGenerateSummary = async () => {
    try {
      setSummaryLoading(true);

      const response = await generateLessonSummary(lesson.content);

      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSummaryLoading(false);
    }
  };
  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Back Navigation & Lesson title greeting */}
        {lesson && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              to={`/student/course/${lesson.course_id}`}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-darkGray-light hover:text-primary transition-colors"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Course Profile</span>
            </Link>
          </div>
        )}
        {isLoading ? (
          <LessonSkeleton />
        ) : lesson ? (
          <div className="space-y-8">
            {/* Split Sidebar / Player Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Player & Meta (70%) */}
              <div className="lg:col-span-8 space-y-6 w-full">
                {/* 1. Player Component */}
                <LessonVideo
                  videoUrl={lesson.video_url}
                  videoType={lesson.video_type}
                />
                {/* 2. Content Details Component */}
                <LessonContent lesson={lesson} />
                <AiLessonSummaryCard
                  summary={summary}
                  loading={summaryLoading}
                  onGenerate={handleGenerateSummary}
                />
              </div>
              {/* Right Column: Lessons Navigator Sidebar (30%) */}
              <div className="lg:col-span-4 w-full">
                <LessonSidebar
                  lessons={courseLessons}
                  currentLessonId={lesson.id}
                  onSelectLesson={handleSelectLesson}
                />
              </div>
            </div>
            {/* Bottom Toolbar: Prev/Next & Complete Buttons */}
            <LessonNavigation
              onPrev={() => handleSelectLesson(prevLessonId)}
              onNext={() => handleSelectLesson(nextLessonId)}
              onComplete={handleToggleComplete}
              onQuiz={handleTakeQuiz}
              isFirst={!prevLessonId}
              isLast={!nextLessonId}
              isCompleted={!!completedLessons[id]}
            />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium text-center max-w-md mx-auto">
            <h3 className="text-lg font-bold text-darkGray font-sans">
              Lesson Not Found
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              The requested lesson does not exist or has been deleted.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
