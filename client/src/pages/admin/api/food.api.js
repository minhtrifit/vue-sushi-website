import axiosInstance from "@/libs/api.instance";

export const getFoods = async (params) => {
  const res = await axiosInstance.get(`/products`, {
    params,
  });
  return res.data;
};

export const getShowcaseFoods = async (categoryId) => {
  const res = await axiosInstance.get(`/products/showcase/${categoryId}`);
  return res.data;
};

export const createFood = async (payload) => {
  const res = await axiosInstance.post(`/products`, payload);
  return res.data;
};

export const getDetailFood = async (id) => {
  const res = await axiosInstance.get(`/products/detail/${id}`);
  return res.data;
};

export const updateFood = async (id, payload) => {
  const res = await axiosInstance.patch(`/products/edit/${id}`, payload);
  return res.data;
};
