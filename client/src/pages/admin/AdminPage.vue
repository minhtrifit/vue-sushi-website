<script setup>
import { watch } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

watch(
  () => userStore.user,
  (newValue, oldValue) => {
    console.log("new:", newValue);
    console.log("old:", oldValue);
  },
);
</script>

<template>
  <div>{{ userStore.user?.fullName }}</div>
</template>
