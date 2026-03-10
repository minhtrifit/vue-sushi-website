<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <v-footer app height="50">
    <v-row class="w-100 px-2 text-caption" align="center">
      <v-col cols="6">
        <v-label class="text-label">
          ©{{ new Date().getFullYear() }} Sushi Restaurant
        </v-label>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.text-label {
  font-size: 0.85rem;
}
</style>
