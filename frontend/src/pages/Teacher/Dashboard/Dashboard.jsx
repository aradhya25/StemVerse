import React, { useState, useEffect } from 'react';
import { useAuth } from "../../../context/AuthContext";
import TeacherLayout from '../../../components/TeacherDashboard/TeacherLayout';
import TeacherDashboardHeader from '../../../components/TeacherDashboard/TeacherDashboardHeader';
import TeacherStats from '../../../components/TeacherDashboard/TeacherStats';
import QuickActions from '../../../components/TeacherDashboard/QuickActions';
import RecentCourses from '../../../components/TeacherDashboard/RecentCourses';
import RecentLessons from '../../../components/TeacherDashboard/RecentLessons';
import RecentEnrollments from '../../../components/TeacherDashboard/RecentEnrollments';
import TopCourses from '../../../components/TeacherDashboard/TopCourses';
import QuizPerformance from '../../../components/TeacherDashboard/QuizPerformance';
import TeacherDashboardSkeleton from '../../../components/TeacherDashboard/TeacherDashboardSkeleton';
import TeacherDashboardError from '../../../components/TeacherDashboard/TeacherDashboardError';
import TeacherDashboardEmpty from '../../../components/TeacherDashboard/TeacherDashboardEmpty';
import { 
  getTeacherDashboard, 
  getRecentCourses, 
  getRecentLessons, 
  getRecentEnrollments, 
  getTopCourses, 
  getQuizPerformance 
} from '../../../services/dashboardApi';
// Fallback preview data (Active only if backend APIs are not reachable)
// const PREVIEW_DASHBOARD = {
//   total_courses: 5,
//   total_lessons: 42,
//   total_quizzes: 18,
//   total_students: 125,
//   completed_lessons: 320
// };
// const PREVIEW_COURSES = [
//   { id: "1", title: "Introduction to Quantum Computing", language: "English", created_at: "2026-05-15T08:00:00Z", thumbnail: "/hero_illustration.jpg" },
//   { id: "2", title: "AI-Powered Python & Robotics", language: "English", created_at: "2026-06-10T12:00:00Z", thumbnail: "/hero_illustration.jpg" }
// ];
// const PREVIEW_LESSONS = [
//   { id: "101", title: "Introduction to Qubits & Superposition", course_title: "Introduction to Quantum Computing", order_no: 1, created_at: "2026-06-28T10:00:00Z" },
//   { id: "102", title: "Understanding Quantum Logic Gates", course_title: "Introduction to Quantum Computing", order_no: 2, created_at: "2026-06-28T11:00:00Z" }
// ];
// const PREVIEW_ENROLLMENTS = [
//   { student_name: "Aradhya Kulkarni", student_email: "abc@gmail.com", course_title: "Introduction to Quantum Computing", enrolled_at: "2026-06-28T12:30:20Z" },
//   { student_name: "Siddharth Verma", student_email: "sidd@gmail.com", course_title: "AI-Powered Python & Robotics", enrolled_at: "2026-06-27T10:15:00Z" }
// ];
// const PREVIEW_TOP_COURSES = [
//   { title: "Introduction to Quantum Computing", students_count: 85 },
//   { title: "AI-Powered Python & Robotics", students_count: 40 }
// ];
// const PREVIEW_PERFORMANCE = [
//   { quiz_title: "Quantum Circuits Quiz", average_score: 8.5, max_score: 10 },
//   { quiz_title: "Variables and Logic Quiz", average_score: 7.2, max_score: 10 }
// ];
export default function Dashboard() {
    const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [quizPerformance, setQuizPerformance] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Promise.all concurrent loadings from APIs
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        dashboardRes, 
        coursesRes, 
        lessonsRes, 
        enrollmentsRes, 
        topCoursesRes, 
        performanceRes
      ] = await Promise.all([
        getTeacherDashboard(),
        getRecentCourses(),
        getRecentLessons(),
        getRecentEnrollments(),
        getTopCourses(),
        getQuizPerformance()
      ]);
      setDashboard(dashboardRes.data.dashboard);
      setCourses(coursesRes.data.courses || []);
      setLessons(lessonsRes.data.lessons || []);
      setEnrollments(enrollmentsRes.data.enrollments || []);
      setTopCourses(topCoursesRes.data.courses || []);
      setQuizPerformance(performanceRes.data.performance || []);
    } catch (err) {

    setError(
        err.response?.data?.message ||
        "Unable to load dashboard"
    );

} finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <TeacherLayout>
      <div className="space-y-8 relative">
        
        {/* Loading Skeleton */}
        {isLoading && <TeacherDashboardSkeleton />}
        {/* Connection Failure Error block */}
        {!isLoading && error && (
          <TeacherDashboardError onRetry={fetchDashboardData} />
        )}
        {/* Content Loaded */}
        {!isLoading && !error && dashboard && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 1. Header welcome banner */}
            <TeacherDashboardHeader user={user}/>
            {/* 2. Stats cards row */}
            <TeacherStats dashboard={dashboard} />
            {/* 3. Quick Actions shortcut panel */}
            <QuickActions />
            {/* If there are no courses total */}
            {dashboard.total_courses === 0 ? (
              <TeacherDashboardEmpty />
            ) : (
              <div className="space-y-8">
                
                {/* 4. Skeletons for Recent Courses & Recent Lessons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Recent Courses Card List */}
                  <RecentCourses courses={courses} />
                  {/* Recent Lessons Card List */}
                  <RecentLessons lessons={lessons} />
                </div>
                {/* 5. Recent Enrollments list */}
                <RecentEnrollments enrollments={enrollments} />
                {/* 6. Top Courses & Quiz Performance Grid split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Top Courses Rankings */}
                  <TopCourses courses={topCourses} />
                  {/* Quiz Performance chart progress bars */}
                  <QuizPerformance performance={quizPerformance} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}