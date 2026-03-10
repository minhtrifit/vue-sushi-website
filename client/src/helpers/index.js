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
