import axiosInstance from "@/libs/api.instance";

export const getSummary = async (params) => {
  const res = await axiosInstance.get(`/stats/summary`, {
    params,
  });
  return res.data;
};

export const trackPageView = async (page) => {
  const res = await axiosInstance.post(`/stats/track`, { page: page });
  return res.data;
};

export const getTrackStats = async (params) => {
  const res = await axiosInstance.get(`/stats/track/stats`, {
    params,
  });
  return res.data;
};

export const getTrackSummary = async () => {
  const res = await axiosInstance.get(`/stats/track/summary`);
  return res.data;
};
