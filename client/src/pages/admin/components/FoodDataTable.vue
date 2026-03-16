<script setup>
import { ref, nextTick } from "vue";
import FsLightbox from "fslightbox-vue";
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
  onView: Function,
  onEdit: Function,
});

const emit = defineEmits(["page-change", "update-status"]);

const HEADERS = [
  { title: "ID", key: "id", width: 400, minWidth: 400 },
  { title: "Name", key: "name", width: 200, minWidth: 200 },
  {
    title: "Image",
    key: "imageUrl",
    width: 100,
    minWidth: 100,
    sortable: false,
  },
  {
    title: "Category",
    key: "category",
    width: 250,
    minWidth: 250,
    sortable: false,
  },
  { title: "Created At", key: "createdAt", minWidth: 300, sortable: false },
  { title: "Updated At", key: "updatedAt", minWidth: 300, sortable: false },
  { title: "Status", key: "isActive", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

const toggler = ref(false);
const previewImage = ref([]);

const handlePreviewImage = async (url) => {
  const isExist = previewImage.value.find((u) => u === url);

  if (!isExist) previewImage.value.push(url);
  else previewImage.value = previewImage.value.filter((u) => u === url);

  await nextTick();

  toggler.value = !toggler.value;
};

const handlePageChange = (p) => {
  emit("page-change", p);
};

const handleUpdateStatus = (payload) => {
  emit("update-status", payload);
};
</script>

<template>
  <FsLightbox
    v-if="previewImage.length"
    :toggler="toggler"
    :sources="previewImage"
  />

  <v-data-table
    :headers="HEADERS"
    :items="items"
    :loading="loading"
    item-value="id"
    class="elevation-1"
    hide-default-footer
  >
    <!-- Image column -->
    <template #item.imageUrl="{ item }">
      <v-img
        class="img-column"
        :src="get(item, 'imageUrl')"
        width="50"
        @click="handlePreviewImage(get(item, 'imageUrl'))"
      />
    </template>

    <!-- Category column -->
    <template #item.category="{ item }">
      <div class="d-flex align-center ga-3">
        <v-img
          class="img-column"
          :src="get(item, 'category.imageUrl')"
          width="50"
          maxWidth="50"
          @click="handlePreviewImage(get(item, 'category.imageUrl'))"
        />
        <span>{{ get(item, "category.name") }}</span>
      </div>
    </template>

    <!-- Created At column -->
    <template #item.createdAt="{ item }">
      <span>{{ formatDateTime(get(item, "createdAt")) }}</span>
    </template>

    <!-- Updated At column -->
    <template #item.updatedAt="{ item }">
      <span>{{ formatDateTime(get(item, "updatedAt")) }}</span>
    </template>

    <!-- isActive column -->
    <template #item.isActive="{ item }">
      <v-switch
        :model-value="get(item, 'isActive')"
        color="primary"
        hide-details
        @update:modelValue="
          (val) => {
            handleUpdateStatus({
              id: get(item, 'id'),
              value: val,
            });
          }
        "
      />
    </template>

    <!-- action column -->
    <template #item.actions="{ item }">
      <div class="d-flex ga-1">
        <v-btn
          icon="mdi-eye"
          size="small"
          variant="text"
          color="primary"
          @click="onView && onView(item)"
        />

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

<style scoped>
.img-column:hover {
  cursor: pointer;
}
</style>
