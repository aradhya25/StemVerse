import api from "./api";

export const getQuizByLesson = (lessonId) => {
  return api.get(`/quizzes/lesson/${lessonId}`);
};

export const getQuestions = (quizId) => {
  return api.get(`/quizzes/${quizId}/questions`);
};

export const submitQuiz = (quizId, data) => {
  return api.post(`/attempts/${quizId}/submit`, data);
};