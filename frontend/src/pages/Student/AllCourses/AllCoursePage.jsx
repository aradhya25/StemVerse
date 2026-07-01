



import React, { useState, useEffect } from 'react';
import StudentLayout from '../../../components/StudDashboard/StudentLayout';
import AllCourseFilter from '../../../components/AllCourses/AllCourseFilter';
import AllCourseGrid from '../../../components/AllCourses/AllCourseGrid';
import AllCourseSkeleton from '../../../components/AllCourses/AllCourseSkeleton';
import EmptyCourses from '../../../components/CourseCard/EmptyCourses';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { getAllCourses } from "../../../services/courseApi";
import {
  enrollCourse,
  getMyCourses,
} from "../../../services/enrollmentApi";
// const ALL_AVAILABLE_COURSES = [
//   {
//     id: "1",
//     title: "Introduction to Quantum Computing",
//     description: "Understand superposition, qubits, quantum gates, and build quantum circuits using AI simulations. Complete course structure detailing concepts and logic gates.",
//     language: "English",
//     thumbnail: "/hero_illustration.jpg",
//     created_by: "Dr. Evelyn Carter",
//     created_at: "2026-05-15T08:00:00Z"
//   },
//   {
//     id: "2",
//     title: "AI-Powered Python & Robotics",
//     description: "Learn Python from basics. Program actuators and robot components using deep learning simulation models.",
//     language: "Marathi",
//     thumbnail: "/hero_illustration.jpg",
//     created_by: "Alex Rivera",
//     created_at: "2026-06-10T12:00:00Z"
//   },
//   {
//     id: "3",
//     title: "Computational Algebra Foundations",
//     description: "Deep dive into vectors, matrices, derivatives, and how they power neural network architectures.",
//     language: "Hindi",
//     thumbnail: "",
//     created_by: "Prof. Marcus Vance",
//     created_at: "2026-04-20T10:30:00Z"
//   },
//   {
//     id: "4",
//     title: "Java Programming Core",
//     description: "Learn Java from basics, object-oriented concepts, exception handling, and API styling parameters.",
//     language: "English",
//     thumbnail: "",
//     created_by: "Dr. Sarah Jenkins",
//     created_at: "2026-06-25T14:45:00Z"
//   }
// ];
export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('All');
  const [sort, setSort] = useState('newest');
  
  // Track enrollments - Pre-enrolling courses 1, 2, and 3 to match MyCourses Page list consistency
 const [enrollments, setEnrollments] = useState({});
  // Success Toast Notification States
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  // Loading Delay (1 second)
 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const courseRes = await getAllCourses();

      setCourses(courseRes.data.courses);

      const enrolledRes = await getMyCourses();

      const enrolledMap = {};

      enrolledRes.data.courses.forEach((course) => {
        enrolledMap[course.id] = true;
      });

      setEnrollments(enrolledMap);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCourses();
}, []);
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };
  // Mock POST /api/enrollments Action Handler
  const handleEnroll = async (courseId) => {
  try {
    await enrollCourse(courseId);

    setEnrollments((prev) => ({
      ...prev,
      [courseId]: true,
    }));

    const courseObj = courses.find((c) => c.id === courseId);

    triggerToast(
      `Enrolled in "${courseObj.title}" successfully!`
    );
  } catch (error) {
    triggerToast(
      error.response?.data?.message || "Enrollment failed",
      "error"
    );
  }
};
  // Dynamic filter languages
  const availableLanguages =
Array.from(
new Set(
courses.map((c) => c.language)
));
  // Filter and Sorting Engine
  const processedCourses = courses
    .filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
      const matchLanguage = language === 'All' || c.language === language;
      return matchSearch && matchLanguage;
    })
    .sort((a, b) => {
      if (sort === 'a-z') {
        return a.title.localeCompare(b.title);
      }
      
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      
      if (sort === 'newest') {
        return timeB - timeA;
      }
      if (sort === 'oldest') {
        return timeA - timeB;
      }
      return 0;
    });
  return (
    <StudentLayout>
      <div className="space-y-8 relative">
        
        {/* Dynamic Toast Notification Panel */}
        {toast.show && (
          <div className={`fixed top-6 right-6 z-50 flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold animate-bounce ${
            toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {toast.type === 'success' ? (
              <FaCheckCircle className="w-5 h-5 text-secondary" />
            ) : (
              <FaExclamationCircle className="w-5 h-5 text-red-500" />
            )}
            <span>{toast.message}</span>
          </div>
        )}
        {/* Header Block */}
        <div>
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            All Courses
          </h1>
          <p className="text-sm text-darkGray-light font-medium mt-1">
            Explore our collection of STEM courses and enroll to begin learning.
          </p>
        </div>
        {/* Search & Filter Header Component */}
        <AllCourseFilter
          search={search}
          onSearchChange={setSearch}
          language={language}
          onLanguageChange={setLanguage}
          sort={sort}
          onSortChange={setSort}
          languages={availableLanguages}
        />
        {/* Discovery Grid Content */}
        {isLoading ? (
          <AllCourseSkeleton count={4} />
        ) : processedCourses.length > 0 ? (
          <AllCourseGrid
            courses={processedCourses}
            enrollments={enrollments}
            onEnroll={handleEnroll}
          />
        ) : (
          <EmptyCourses />
        )}
      </div>
    </StudentLayout>
  );
}