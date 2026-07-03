import api from "./api";

// Lesson
export const getLessonById = (lessonId) =>
  api.get(`/lessons/${lessonId}`);

// Quiz
export const getQuizzes = (lessonId) =>
  api.get(`/quizzes/lesson/${lessonId}`);

export const getQuizById = (quizId) =>
  api.get(`/quizzes/${quizId}`);

export const createQuiz = (data) => {
  return api.post("/quizzes", data);
};

export const updateQuiz = (quizId, data) =>
  api.put(`/quizzes/${quizId}`, data);

export const deleteQuiz = (quizId) =>
  api.delete(`/quizzes/${quizId}`);

// Questions
export const getQuestions = (quizId) =>
  api.get(`/quizzes/${quizId}/questions`);

export const addQuestion = (quizId, data) =>
  api.post(`/quizzes/${quizId}/questions`, data);