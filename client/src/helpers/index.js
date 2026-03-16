import Cookies from "js-cookie";
import dayjs from "dayjs";
import { toast } from "vue3-toastify";

const APP_KEY = import.meta.env.VITE_APP_KEY;

export const forceLogout = async () => {
  Cookies.remove(APP_KEY);
  window.location.href = "/";
};

export const adminLogout = async () => {
  Cookies.remove(APP_KEY);
  window.location.href = "/auth/login";
};

export const handleLogout = async (title) => {
  toast.error(title, {
    position: "bottom-left",
    autoClose: 2000,
    theme: "colored",
    onClose: () => {
      forceLogout();
    },
  });
};

export const formatErrorMessage = (message) => {
  const resMessage = message;

  let content = "Something wrong";

  if (Array.isArray(resMessage)) {
    // Nếu là mảng object { field, message }
    if (
      resMessage.every((item) => typeof item === "object" && "message" in item)
    ) {
      content = resMessage.map((item) => item.message).join(", ");
    } else {
      // Nếu là mảng string
      content = resMessage.join(", ");
    }
  } else if (typeof resMessage === "string") {
    content = resMessage;
  }

  return content;
};

export const formatNewLineToBr = (text) => {
  if (!text) return "";
  return text.replace(/\n/g, "<br/>");
};

// Example: 2026-03-11T03:18:47.762Z
export const formatDateTime = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateSku = () => {
  return `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};
