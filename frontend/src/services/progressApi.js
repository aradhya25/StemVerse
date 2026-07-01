import api from "./api";

export const saveProgress = (data) => {
  return api.post("/progress", data);
};

export const getMyProgress = () => {
  return api.get("/progress/my-progress");
};