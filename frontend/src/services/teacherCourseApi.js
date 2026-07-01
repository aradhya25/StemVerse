import api from "./api";
export const getMyCourses = () => {
  return api.get("/courses/my-courses");
};

export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

export const createCourse = (formData) => {
  return api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCourse = (id, data) => {
  return api.put(`/courses/${id}`, data);
};

export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};