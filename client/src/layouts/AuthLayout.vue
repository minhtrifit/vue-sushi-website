<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.replace("/admin/dashboard");
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
