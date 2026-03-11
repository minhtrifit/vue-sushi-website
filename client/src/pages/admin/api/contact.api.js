import axiosInstance from "@/libs/api.instance";

export const getContacts = async (params) => {
  const res = await axiosInstance.get(`/contacts`, {
    params,
  });
  return res.data;
};

export const createContact = async (email) => {
  const res = await axiosInstance.post(`/contacts`, { email: email });
  return res.data;
};
