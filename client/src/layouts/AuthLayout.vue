<script setup>
import Cookies from "js-cookie";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { verifyToken } from "../pages/admin/api/auth.api";

const APP_KEY = import.meta.env.VITE_APP_KEY;

const router = useRouter();
const userStore = useUserStore();

const handleVerfiyToken = async () => {
  try {
    userStore.setLoading(true);

    const res = await verifyToken();

    if (res.success) {
      userStore.setUser(res.data);
      router.push("/admin/dashboard");
    }
  } catch (error) {
    console.log("Verify token failed:", error);
  } finally {
    userStore.setLoading(false);
  }
};

onMounted(() => {
  const session = Cookies.get(APP_KEY);

  if (session) {
    try {
      const parsedSession = JSON.parse(session);
      const token = parsedSession?.token;

      if (token) handleVerfiyToken();
    } catch (error) {
      console.error("Không thể parse session:", error);
    }
  }
});
</script>

<template>
  <v-app>
    <div class="auth-layout">
      <router-view />
    </div>
  </v-app>
</template>

<style>
body.auth-layout {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: var(--normal-font-size);
  background-color: #fff;
  color: #000;
}
</style>
