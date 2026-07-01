import api from "./api";

export const getMyAttempts = () => {
  return api.get("/attempts/my-attempts");
};