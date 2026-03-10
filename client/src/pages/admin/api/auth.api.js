import axiosInstance from "@/libs/api.instance";

export const login = async (payload) => {
  const res = await axiosInstance.post("/auth/login", payload);
  return res.data;
};

export const verifyToken = async () => {
  const res = await axiosInstance.get("/auth/verify");
  return res.data;
};
