<script setup>
import { PhHouse, PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="breadcrumb-wrapper d-flex align-center ga-3">
    <!-- Home icon -->
    <router-link
      to="/admin/dashboard"
      class="home-icon d-flex align-center justify-center"
    >
      <PhHouse size="20" color="white" />
    </router-link>

    <!-- Breadcrumb -->
    <v-sheet class="breadcrumb-pill d-flex align-center ga-2">
      <template v-for="(item, index) in props.items" :key="index">
        <router-link v-if="!item.disabled" :to="item.to" class="crumb-link">
          {{ item.title }}
        </router-link>

        <span v-else class="crumb-active">
          {{ item.title }}
        </span>

        <div v-if="index < props.items.length - 1" class="divider">
          <PhCaretRight size="15" />
        </div>
      </template>
    </v-sheet>
  </div>
</template>

<style scoped>
.breadcrumb-wrapper {
  position: relative;
}

.home-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--first-color);
}

.breadcrumb-pill {
  background: #fff;
  border-radius: 999px;
  padding: 8px 20px 8px 60px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.15);
}

.crumb-link {
  text-decoration: none;
  color: #444;
}

.crumb-link:hover {
  text-decoration: underline;
}

.crumb-active {
  color: #888;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}
</style>
