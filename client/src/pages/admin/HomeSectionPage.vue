<script setup>
import HomeForm from "./components/HomeForm.vue";

const handleSubmitSection = async (payload) => {
  const { value, resetFn } = payload;

  console.log(value);

  resetFn();
};
</script>

<template>
  <v-card>
    <v-card-text>
      <HomeForm @submit-home-section="handleSubmitSection" />
    </v-card-text>
  </v-card>
</template>
