import api from "./api";

export const enrollCourse = (courseId) => {
  return api.post("/enrollments", {
    course_id: courseId,
  });
};

export const getMyCourses = () => {
  return api.get("/enrollments/my-courses");
};