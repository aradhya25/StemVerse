import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import StudentLayout from '../../../components/StudDashboard/StudentLayout';
import SearchBar from '../../../components/CourseCard/SearchBar';
import LanguageFilter from '../../../components/CourseCard/LanguageFilter';
import CourseGrid from '../../../components/CourseCard/CourseGrid';
import EmptyCourses from '../../../components/CourseCard/EmptyCourses';
import LoadingSkeleton from '../../../components/CourseCard/LoadingSkeleton';
import { getAllCourses } from "../../../services/courseApi";
import { getMyCourses } from "../../../services/enrollmentApi";
// const BACKEND_COURSES = [
//   {
//     id: "1",
//     title: "Introduction to Quantum Computing",
//     description: "Understand superposition, qubits, quantum gates, and build quantum circuits using AI simulations.",
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
export default function MyCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'a-z'
  // Simulating loading sequence (1 second)
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await getMyCourses();

      console.log(res.data);

      setCourses(res.data.courses);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCourses();
}, []);
  // Filter unique languages from courses dataset
  const availableLanguages = Array.from(
  new Set(courses.map((c) => c.language))
);
  // Redirect callback simulation
  const handleViewCourse = (courseId) => {
  navigate(`/student/course/${courseId}`);
};
  // Filter and Sort Engine
  const processedCourses = courses
    .filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase());
      const matchLanguage = language === 'All' || c.language === language;
      return matchSearch && matchLanguage;
    })
    .sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.title.localeCompare(b.title);
      }
      
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      
      if (sortBy === 'newest') {
        return timeB - timeA;
      }
      if (sortBy === 'oldest') {
        return timeA - timeB;
      }
      return 0;
    });
  return (
    <StudentLayout>
      <div className="space-y-8">
        
        {/* Page Header Titles */}
        <div>
          <h1 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
            My Courses
          </h1>
          <p className="text-sm text-darkGray-light font-medium mt-1">
            Browse and continue your learning journey.
          </p>
        </div>
        {/* Filters and Inputs row */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Reusable Search Bar Component */}
          <SearchBar value={search} onChange={setSearch} />
          {/* Selector filters split */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            
            {/* Reusable Language Filter Component */}
            <LanguageFilter 
              value={language} 
              onChange={setLanguage} 
              languages={availableLanguages} 
            />
            {/* Sort Dropdown */}
            <div className="relative min-w-[160px] flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-darkGray bg-[#F8FAFC] focus:bg-white appearance-none cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="a-z">Sort: A to Z</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>
        </div>
        {/* Content Render Grid */}
        {isLoading ? (
          <LoadingSkeleton count={3} />
        ) : processedCourses.length > 0 ? (
          <CourseGrid 
            courses={processedCourses} 
            onViewCourse={handleViewCourse} 
          />
        ) : (
          <EmptyCourses />
        )}
      </div>
    </StudentLayout>
  );
}