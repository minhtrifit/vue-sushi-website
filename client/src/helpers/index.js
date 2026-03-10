import Cookies from "js-cookie";
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
