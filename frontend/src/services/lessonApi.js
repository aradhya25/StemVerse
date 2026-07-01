import api from "./api";
export const getLessonById = (lessonId) => {
  return api.get(`/lessons/${lessonId}`);
};
export const getLessonsByCourse = (courseId) => {
  return api.get(`/lessons/course/${courseId}`);
};