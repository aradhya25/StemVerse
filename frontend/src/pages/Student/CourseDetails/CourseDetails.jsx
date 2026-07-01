import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import StudentLayout from '../../../components/StudDashboard/StudentLayout';
import CourseHero from '../../../components/CourseDetails/CourseHero';
import CourseInfo from '../../../components/CourseDetails/CourseInfo';
import LessonList from '../../../components/LessonCard/LessonList';
import EmptyLessons from '../../../components/LessonCard/EmptyLesson';
import CourseSkeleton from '../../../components/CourseDetails/CourseSkeleton';
import { getCourseById } from "../../../services/courseApi";
import { getLessonsByCourse } from "../../../services/lessonApi";
import ReviewSection from '../Reviews/ReviewSection';
// const MOCK_COURSES = {
//   "1": {
//     id: "1",
//     title: "Introduction to Quantum Computing",
//     description: "Understand superposition, qubits, quantum gates, and build quantum circuits using AI simulations. Complete course structure detailing concepts and logic gates.",
//     language: "English",
//     thumbnail: "/hero_illustration.jpg",
//     created_by: "Dr. Evelyn Carter",
//     created_at: "2026-05-15T08:00:00Z"
//   },
//   "2": {
//     id: "2",
//     title: "AI-Powered Python & Robotics",
//     description: "Learn Python from basics. Program actuators and robot components using deep learning simulation models.",
//     language: "Marathi",
//     thumbnail: "/hero_illustration.jpg",
//     created_by: "Alex Rivera",
//     created_at: "2026-06-10T12:00:00Z"
//   },
//   "3": {
//     id: "3",
//     title: "Computational Algebra Foundations",
//     description: "Deep dive into vectors, matrices, derivatives, and how they power neural network architectures.",
//     language: "Hindi",
//     thumbnail: "",
//     created_by: "Prof. Marcus Vance",
//     created_at: "2026-04-20T10:30:00Z"
//   },
//   "4": {
//     id: "4",
//     title: "Java Programming Core",
//     description: "Learn Java from basics, object-oriented concepts, exception handling, and API styling parameters.",
//     language: "English",
//     thumbnail: "",
//     created_by: "Dr. Sarah Jenkins",
//     created_at: "2026-06-25T14:45:00Z"
//   }
// };
// const MOCK_LESSONS = {
//   "1": [
//     { id: "101", title: "Introduction to Qubits & Superposition", video_url: "https://...", duration: 15, order_no: 1 },
//     { id: "102", title: "Understanding Quantum Logic Gates", video_url: "https://...", duration: 20, order_no: 2 },
//     { id: "103", title: "Building Circuits with Qiskit", video_url: "https://...", duration: 25, order_no: 3 },
//   ],
//   "2": [
//     { id: "201", title: "Setup and Python Basics", video_url: "https://...", duration: 10, order_no: 1 },
//     { id: "202", title: "Robotics Actuators & Controls", video_url: "https://...", duration: 30, order_no: 2 },
//   ],
//   "3": [
//     { id: "301", title: "Vector Spaces and Matrices", video_url: "https://...", duration: 22, order_no: 1 },
//   ],
//   "4": [] // Java Programming Core has no lessons to trigger EmptyLessons component!
// };
export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
  const fetchCourseDetails = async () => {
    try {
      const courseRes = await getCourseById(id);

      console.log("Course:", courseRes.data);

      setCourse(courseRes.data.course);

      const lessonRes = await getLessonsByCourse(id);

      console.log("Lessons:", lessonRes.data);

      setLessons(lessonRes.data.lessons);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCourseDetails();
}, [id]);
 const handleStartLearning = () => {
  if (lessons.length === 0) return;

  const sorted = [...lessons].sort(
    (a, b) => (a.order_no || 0) - (b.order_no || 0)
  );

  navigate(`/student/lesson/${sorted[0].id}`);
};
  const handleViewLesson = (lessonId) => {
  navigate(`/student/lesson/${lessonId}`);
};
  return (
    <StudentLayout>
      <div className="space-y-8">
        
        {/* Back Navigation */}
        <Link
          to="/courses"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-darkGray-light hover:text-primary transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Courses</span>
        </Link>
        {isLoading ? (
          <CourseSkeleton />
        ) : course ? (
          <div className="space-y-8">
            {/* 1. Hero banner */}
            <CourseHero 
              course={course} 
              onStartLearning={handleStartLearning} 
            />
            {/* 2. Course Meta Information Info Card */}
            <CourseInfo course={course} />
            {/* 3. Course Lessons Content List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-darkGray font-sans">
                Course Content
              </h2>
              {lessons.length > 0 ? (
                <LessonList 
                  lessons={lessons} 
                  onViewLesson={handleViewLesson} 
                />
              ) : (
                <EmptyLessons />
              )}
            </div>
            <ReviewSection courseId={course.id} />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-premium text-center">
            <h3 className="text-lg font-bold text-darkGray">Course Not Found</h3>
            <p className="text-sm text-slate-400 mt-2">The requested course could not be located in our dataset.</p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
