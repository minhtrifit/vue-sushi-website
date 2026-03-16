<script setup>
import { reactive } from "vue";
import { IS_ACTIVE_OPTIONS } from "@/constants/index";

const props = defineProps({
  filter: {
    type: Object,
    default: {
      q: "",
      isActive: "",
    },
  },
});

const emit = defineEmits(["search", "create"]);

const filter = reactive({
  q: props.filter.q,
  isActive: props.filter.isActive ?? "",
});

const handleSearch = () => {
  emit("search", { ...filter });
};

const handleCreate = () => {
  emit("create");
};
</script>

<template>
  <v-card>
    <v-card-text class="d-flex align-center justify-space-between ga-2">
      <form class="d-flex align-center ga-2" @submit.prevent="handleSearch">
        <v-text-field
          v-model="filter.q"
          style="width: 400px"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          clearable
          hide-details
        />

        <v-select
          v-model="filter.isActive"
          :items="IS_ACTIVE_OPTIONS"
          label="Status"
          item-title="title"
          item-value="value"
          style="width: 160px"
          variant="outlined"
          density="compact"
          hide-details
        />

        <v-btn height="40" color="primary" type="submit">
          <v-icon start>mdi-magnify</v-icon>
          Search
        </v-btn>
      </form>

      <v-btn height="40" color="primary" @click="handleCreate">
        <v-icon start>mdi-plus</v-icon>
        Add new
      </v-btn>
    </v-card-text>
  </v-card>
</template>
