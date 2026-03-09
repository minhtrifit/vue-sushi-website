<script setup>
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import LoginForm from "./components/LoginForm.vue";

const router = useRouter();

const handleLogin = async (payload) => {
  const { value, resetFn } = payload;

  console.log("LOGIN PAYLOAD:", value);

  const token = crypto.randomUUID();

  localStorage.setItem("token", token);

  resetFn();

  router.push("/admin/dashboard");

  toast.success("Login success", {
    position: "bottom-left",
    autoClose: 3000,
    theme: "colored",
  });
};
</script>

<template>
  <main class="login-page">
    <LoginForm @submit-login="handleLogin" />
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
