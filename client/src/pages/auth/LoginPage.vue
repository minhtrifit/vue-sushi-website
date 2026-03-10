<script setup>
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useUserStore } from "@/stores/user";
import { useLodingMutation } from "../admin/composables/useLoginMutation";
import LoginForm from "./components/LoginForm.vue";

const APP_KEY = import.meta.env.VITE_APP_KEY;

const router = useRouter();
const userStore = useUserStore();

const { login, loading } = useLodingMutation();

const handleLogin = async (payload) => {
  const { value, resetFn } = payload;

  login(
    {
      email: value.email,
      password: value.password,
    },
    {
      onSuccess: (data) => {
        console.log("success:", data);

        Cookies.set(APP_KEY, JSON.stringify(data.data));
        userStore.setUser(data.data);

        router.push("/admin/dashboard");

        toast.success(data.message || "Login successfully", {
          position: "bottom-left",
          autoClose: 3000,
          theme: "colored",
        });

        resetFn();
      },
      onError: (data) => {
        console.log("error:", data);
      },
    },
  );
};
</script>

<template>
  <main class="login-page">
    <LoginForm @submit-login="handleLogin" :loading="loading" />
  </main>
</template>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
