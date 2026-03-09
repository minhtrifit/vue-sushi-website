import Cookies from "js-cookie";

const APP_KEY = import.meta.env.VITE_APP_KEY;

export const forceLogout = async () => {
  Cookies.remove(APP_KEY);
  window.location.href = "/";
};
