<script setup>
import Cookies from "js-cookie";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { verifyToken } from "../pages/admin/api/auth.api";
import { handleLogout } from "../helpers";
import FullScreenLoading from "../components/FullScreenLoading.vue";

const APP_KEY = import.meta.env.VITE_APP_KEY;

const router = useRouter();
const userStore = useUserStore();

const handleVerfiyToken = async () => {
  try {
    userStore.setLoading(true);

    const res = await verifyToken();

    if (res.success) userStore.setUser(res.data);
    else router.push("/auth/login");
  } catch (error) {
    console.log("Verify token failed:", error);
  } finally {
    setTimeout(() => {
      userStore.setLoading(false);
    }, 1000);
  }
};

onMounted(() => {
  const session = Cookies.get(APP_KEY);

  if (session) {
    try {
      const parsedSession = JSON.parse(session);
      const token = parsedSession?.token;

      if (!token) {
        handleLogout("Token not found");
        return;
      }

      handleVerfiyToken();
    } catch (error) {
      console.error("Không thể parse session:", error);
      handleLogout("Verify session failed");
    }
  } else {
    handleLogout("Token not found");
  }
});
</script>

<template>
  <div class="admin-layout">
    <full-screen-loading v-if="userStore.loading" />
    <router-view v-else />
  </div>
</template>

<style>
body.admin-layout {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: var(--normal-font-size);
  background-color: #fff;
  color: #000;
}
</style>
