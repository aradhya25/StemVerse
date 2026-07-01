import api from "./api";

export const getCourseReviews = (courseId) => {
  return api.get(`/reviews/${courseId}`);
};

export const addReview = (data) => {
  return api.post("/reviews", data);
};

export const updateReview = (reviewId, data) => {
  return api.put(`/reviews/${reviewId}`, data);
};

export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);
};