import api from "./api";
// GET /api/dashboard/teacher
export const getTeacherDashboard = async () => {
  return api.get('/dashboard/teacher');
};
// GET /api/dashboard/recent-courses
export const getRecentCourses = async () => {
  return api.get('/dashboard/recent-courses');
};
// GET /api/dashboard/recent-lessons
export const getRecentLessons = async () => {
  return api.get('/dashboard/recent-lessons');
};
// GET /api/dashboard/recent-enrollments
export const getRecentEnrollments = async () => {
  return api.get('/dashboard/recent-enrollments');
};
// GET /api/dashboard/top-courses
export const getTopCourses = async () => {
  return api.get('/dashboard/top-courses');
};
// GET /api/dashboard/quiz-performance
export const getQuizPerformance = async () => {
  return api.get('/dashboard/quiz-performance');
};
