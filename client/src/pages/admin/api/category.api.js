import axiosInstance from "@/libs/api.instance";

export const getCategories = async (params) => {
  const res = await axiosInstance.get(`/category`, {
    params,
  });
  return res.data;
};

export const getShowcaseCategories = async (params) => {
  const res = await axiosInstance.get(`/category/showcase`, {
    params,
  });
  return res.data;
};

export const createCategory = async (payload) => {
  const res = await axiosInstance.post(`/category`, payload);
  return res.data;
};

export const getDetailCategory = async (id) => {
  const res = await axiosInstance.get(`/category/detail/${id}`);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await axiosInstance.patch(`/category/edit/${id}`, payload);
  return res.data;
};
