<script setup>
import Cookies from "js-cookie";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { verifyToken } from "../pages/admin/api/auth.api";
import { handleLogout } from "../helpers";
import FullScreenLoading from "../components/FullScreenLoading.vue";
import NoPermission from "../components/NoPermission.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";

const APP_KEY = import.meta.env.VITE_APP_KEY;

const router = useRouter();
const userStore = useUserStore();

const drawer = ref(true);

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

    <no-permission v-if="!userStore.loading && !userStore.user" />

    <v-app v-if="!userStore.loading && userStore.user">
      <sidebar v-model="drawer" />

      <navbar v-model="drawer" />

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
