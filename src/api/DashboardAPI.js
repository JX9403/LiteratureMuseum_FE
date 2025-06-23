import http from "../utils/http";

export const fetchDashboardCounts = async () => {
  const res = await http.get("/api/dashboard/counts");
  return res.data;
};


export const fetchDashboardHighlights = async () => {
  const res = await http.get("/api/dashboard/highlights");
  return res.data;
};
