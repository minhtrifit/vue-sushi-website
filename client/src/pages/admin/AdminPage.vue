<script setup>
import { useUsersQuery } from "./composables/useUsersQuery";

const { data, isLoading, error } = useUsersQuery();
</script>

<template>
  <div v-if="isLoading">Loading...</div>

  <div v-else-if="error">Error</div>

  <ul v-else>
    <li v-for="user in data" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
