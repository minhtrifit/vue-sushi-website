import axiosInstance from "@/libs/api.instance";

export const getSectionByType = async (type) => {
  const res = await axiosInstance.get(`/sections/${type}`);
  return res.data;
};

export const updateSection = async (id, payload) => {
  const res = await axiosInstance.patch(`/sections/${id}`, payload);
  return res.data;
};
