<script setup>
import { get } from "lodash";
import { PhWarning } from "@phosphor-icons/vue";

const props = defineProps({
  content: {
    type: String,
    default: "Something wrong",
  },
});
</script>

<template>
  <main class="error-wrapper">
    <div class="container">
      <PhWarning :size="70" color="red" />
      <span>{{ get(props, "content") }}</span>
    </div>
  </main>
</template>

<style scoped>
.error-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0;
}

.error-wrapper .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-wrapper .container span {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--title-color);
}
</style>
