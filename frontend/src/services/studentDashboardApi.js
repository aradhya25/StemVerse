import api from "./api";

export const getDashboard = () =>
  api.get("/student-dashboard");

export const getContinueLearning = () =>
  api.get("/student-dashboard/continue-learning");

export const getRecentAttempts = () =>
  api.get("/student-dashboard/recent-attempts");