import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const performAction = (action) => {
  return api.post("/action", { action });
};

export const getTables = () => {
  return api.get("/tables");
};
