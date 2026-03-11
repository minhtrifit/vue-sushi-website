<script setup>
import { reactive } from "vue";

const props = defineProps({
  filter: {
    type: Object,
    default: {
      q: "",
    },
  },
});

const emit = defineEmits(["search"]);

const filter = reactive({
  q: props.filter.q,
});

const handleSearch = () => {
  emit("search", { ...filter });
};
</script>

<template>
  <v-card>
    <v-card-text>
      <form class="d-flex align-center ga-2" @submit.prevent="handleSearch">
        <v-text-field
          v-model="filter.q"
          style="width: 400px; height: 40px; flex: none"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          clearable
          hide-details
        />

        <v-btn style="height: 40px" color="primary" type="submit">
          <v-icon start>mdi-magnify</v-icon>
          Search
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>
