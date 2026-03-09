import axiosInstance from "@/libs/api.instance";

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};
