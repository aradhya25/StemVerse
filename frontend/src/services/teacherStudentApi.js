import api from "./api";

// Get all students for teacher dashboard
export const getTeacherStudents = async () => {
  return await api.get("/teacher/students");
};