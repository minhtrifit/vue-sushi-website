<script setup>
import { reactive, watch } from "vue";
import { TABLE_LIMIT } from "@/constants/index";
import { formatErrorMessage } from "@/helpers";
import { useQueryParams } from "@/composables/useQueryParams";
import { useContactList } from "./composables/useContactList";
import Error from "@/components/Error.vue";
import ContactFilterBar from "./components/ContactFilterBar.vue";
import ContactDataTable from "./components/ContactDataTable.vue";

const { params, updateParams } = useQueryParams();

const page = params.value.page ? Number(params.value.page) : 1;
const q = params.value.q || "";

const filter = reactive({
  page: page,
  q: q,
  limit: TABLE_LIMIT,
});

const tableData = reactive({
  data: [],
  paging: null,
});

const { data, loading, error, refetch } = useContactList(filter);

// Update Table data
watch(
  data,
  (res) => {
    if (!res?.success) return;
    Object.assign(tableData, res.data);
  },
  { immediate: true },
);

// Update error message
watch(error, (err) => {
  console.log("ERROR:", err?.response?.data);
  errorMessage.value = formatErrorMessage(err?.response?.data?.message) || null;
});

const handleSubmitSearch = async (payload) => {
  updateParams({ q: payload.q });

  filter.page = 1;
  filter.q = payload.q;

  refetch();
};

const handleChangePage = (value) => {
  updateParams({ page: value });
  filter.page = value;
  refetch();
};

const editItem = (item) => {
  console.log("edit", item);
};
</script>

<template>
  <main class="block__container">
    <ContactFilterBar :filter="filter" @search="handleSubmitSearch" />

    <Error v-if="!loading && error" :content="errorMessage" />

    <ContactDataTable
      :loading="loading"
      :items="tableData.data"
      :paging="tableData.paging"
      :onEdit="editItem"
      @page-change="handleChangePage"
    />
  </main>
</template>
