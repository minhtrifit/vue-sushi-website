<script setup>
import { get } from "lodash";
import { formatDateTime } from "@/helpers/index";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  paging: {
    type: Object,
    default: {
      current_page: 1,
      total_item: 0,
      total_page: 1,
      total: 0,
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  onEdit: Function,
});

const emit = defineEmits(["page-change"]);

const HEADERS = [
  { title: "ID", key: "id", width: 400, minWidth: 400 },
  { title: "Email", key: "email" },
  { title: "Send At", key: "createdAt", minWidth: 300 },
  //   { title: "Actions", key: "actions", sortable: false },
];

const handlePageChange = (p) => {
  emit("page-change", p);
};
</script>

<template>
  <v-data-table
    :headers="HEADERS"
    :items="items"
    :loading="loading"
    item-value="id"
    class="elevation-1"
    hide-default-footer
  >
    <!-- Send At column -->
    <template #item.createdAt="{ item }">
      <span>{{ formatDateTime(get(item, "createdAt")) }}</span>
    </template>

    <!-- action column -->
    <template #item.actions="{ item }">
      <div class="d-flex ga-1">
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          color="primary"
          @click="onEdit && onEdit(item)"
        />
      </div>
    </template>

    <!-- pagination -->
    <template #bottom>
      <div class="d-flex justify-space-between align-center pa-4">
        <div class="text-caption">
          Total: {{ get(props, "paging.total_item") }} /
          {{ get(props, "paging.total") }}
        </div>

        <v-pagination
          :model-value="get(props, 'paging.current_page')"
          :length="get(props, 'paging.total_page')"
          :total-visible="2"
          @update:modelValue="handlePageChange"
        />
      </div>
    </template>
  </v-data-table>
</template>
