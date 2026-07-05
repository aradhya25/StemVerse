import api from "./api";

export const getTeacherReviews = () => {
  return api.get("/teacher/reviews");
};