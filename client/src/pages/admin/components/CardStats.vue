<script>
export const ICON_TYPE = {
  CATEGORY: "CATEGORY",
  FOOD: "FOOD",
  CONTACT: "CONTACT",
};
</script>

<script setup>
import { computed, ref, watch } from "vue";
import { get } from "lodash";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: "Card title",
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  icon: {
    type: String,
    default: "CATEGORY",
  },
});

const ICON_TYPE = {
  CATEGORY: "CATEGORY",
  FOOD: "FOOD",
  CONTACT: "CONTACT",
};

const iconName = computed(() => {
  if (props.icon === ICON_TYPE.CATEGORY) return "mdi-shape";
  if (props.icon === ICON_TYPE.FOOD) return "mdi-food";
  if (props.icon === ICON_TYPE.CONTACT) return "mdi-account";
  return "mdi-help";
});

// 🔥 count up logic
const displayValue = ref(0);

const animateCount = (start, end, duration = 800) => {
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    displayValue.value = Math.floor(start + (end - start) * progress);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

// 🔥 watch value change
watch(
  () => props.value,
  (newVal) => {
    animateCount(displayValue.value, newVal);
  },
  { immediate: true },
);
</script>

<template>
  <v-card class="pa-4 d-flex align-center justify-space-between">
    <div>
      <h3 class="text-caption text-grey my-0">
        {{ get(props, "title") }}
      </h3>

      <v-skeleton-loader
        v-if="props.loading"
        class="pa-0"
        type="text"
        width="200"
      />
      <span v-else style="font-size: 1.75rem; font-weight: 600">
        {{ displayValue }}
      </span>
    </div>

    <v-avatar color="primary" size="40">
      <v-icon :icon="iconName" />
    </v-avatar>
  </v-card>
</template>
