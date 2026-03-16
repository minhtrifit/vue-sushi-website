<script setup>
import { reactive, ref, watch, computed } from "vue";
import { toast } from "vue3-toastify";
import { TABLE_LIMIT } from "@/constants/index";
import { formatErrorMessage } from "@/helpers";
import { FORM_MODE } from "@/constants";
import { useQueryParams } from "@/composables/useQueryParams";
import { useCategoryList } from "./composables/useCategoryList";
import { useCategory } from "./composables/useCategory";
import { useCreateCategoryMutation } from "./composables/useCreateCategoryMutation";
import { useUpdateCategoryMutation } from "./composables/useUpdateCategoryMutation";
import Error from "@/components/Error.vue";
import CategoryModal from "./components/CategoryModal.vue";
import CategoryFilterBar from "./components/CategoryFilterBar.vue";
import CategoryDataTable from "./components/CategoryDataTable.vue";

const { params, updateParams } = useQueryParams();

const page = params.value.page ? Number(params.value.page) : 1;
const q = params.value.q || "";
const isActive = params.value.isActive || "";
const openDetail = computed(() => params.value.open_detail || "");

const openModal = ref(false);
const modalMode = ref(FORM_MODE.ADD);
const errorMessage = ref("");

const filter = reactive({
  page: page,
  q: q,
  isActive: isActive,
  limit: TABLE_LIMIT,
});

const tableData = reactive({
  data: [],
  paging: null,
});

const targetCategory = reactive({});

const { data, loading, error, refetch } = useCategoryList(filter);
const { loading: categoryLoading, fetch: fetchDetail } = useCategory();
const { create, loading: createLoading } = useCreateCategoryMutation();
const { update, loading: updateLoading } = useUpdateCategoryMutation();

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

// Trigger auto open detail
watch(
  openDetail,
  async (value) => {
    if (!value) return;

    const res = await fetchDetail(value);
    const category = res.data.data;

    if (category) {
      Object.assign(targetCategory, category);
      modalMode.value = FORM_MODE.VIEW;
      openModal.value = true;
    }
  },
  { immediate: true },
);

const handleSubmitSearch = async (payload) => {
  updateParams({ q: payload.q, isActive: payload.isActive });

  filter.page = 1;
  filter.q = payload.q;
  filter.isActive = payload.isActive;

  refetch();
};

const handleChangePage = (value) => {
  updateParams({ page: value });
  filter.page = value;
  refetch();
};

const handleUpdateStatus = (payload) => {
  update(
    {
      id: payload.id,
      payload: {
        isActive: payload.value,
      },
    },
    {
      onSuccess: (data) => {
        console.log("success:", data);

        toast.success(data.message || "Update successfully", {
          position: "bottom-left",
          autoClose: 3000,
          theme: "colored",
        });

        close();

        refetch({
          ...filter,
        });
      },
      onError: (data) => {
        console.log("error:", data);
      },
    },
  );
};

const viewItem = async (item) => {
  console.log("view", item);

  const res = await fetchDetail(item.id);
  const category = res.data.data;

  if (category) {
    Object.assign(targetCategory, category);
    modalMode.value = FORM_MODE.VIEW;
    openModal.value = true;
  }
};

const editItem = (item) => {
  console.log("edit", item);
  Object.assign(targetCategory, item);
  modalMode.value = FORM_MODE.EDIT;
  openModal.value = true;
};

const handleCloseModal = () => {
  openModal.value = false;

  setTimeout(() => {
    Object.keys(targetCategory).forEach((key) => {
      delete targetCategory[key];
    });

    modalMode.value = FORM_MODE.ADD;
  }, 500);

  if (openDetail.value !== "") updateParams({ open_detail: "" });
};

const handleSubmit = (payload) => {
  const { value, mode, resetFn, close } = payload;

  console.log("SUBMIT DATA:", payload);

  if (mode === FORM_MODE.ADD) {
    create(
      {
        ...value,
      },
      {
        onSuccess: (data) => {
          console.log("success:", data);

          toast.success(data.message || "Create successfully", {
            position: "bottom-left",
            autoClose: 3000,
            theme: "colored",
          });

          close();

          refetch({
            ...filter,
            page: 1,
          });
        },
        onError: (data) => {
          console.log("error:", data);
        },
      },
    );
  }

  if (mode === FORM_MODE.EDIT) {
    update(
      {
        id: targetCategory.id,
        payload: value,
      },
      {
        onSuccess: (data) => {
          console.log("success:", data);

          toast.success(data.message || "Update successfully", {
            position: "bottom-left",
            autoClose: 3000,
            theme: "colored",
          });

          close();

          refetch({
            ...filter,
          });
        },
        onError: (data) => {
          console.log("error:", data);
        },
      },
    );
  }
};
</script>

<template>
  <main class="block__container">
    <CategoryModal
      :mode="modalMode"
      :open="openModal"
      :category="targetCategory"
      :loading="createLoading || updateLoading || categoryLoading"
      @submit="handleSubmit"
      @close="handleCloseModal"
    />

    <CategoryFilterBar
      :filter="filter"
      @search="handleSubmitSearch"
      @create="openModal = true"
    />

    <Error v-if="!loading && error" :content="errorMessage" />

    <CategoryDataTable
      :loading="loading"
      :items="tableData.data"
      :paging="tableData.paging"
      :onView="viewItem"
      :onEdit="editItem"
      @page-change="handleChangePage"
      @update-status="handleUpdateStatus"
    />
  </main>
</template>
