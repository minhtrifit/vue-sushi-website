<script setup>
import { reactive, ref, watch, computed } from "vue";
import { toast } from "vue3-toastify";
import { TABLE_LIMIT } from "@/constants/index";
import { formatErrorMessage } from "@/helpers";
import { FORM_MODE } from "@/constants";
import { useQueryParams } from "@/composables/useQueryParams";
import { useShowcaseCategory } from "@/composables/useShowcaseCategory";
import { useFoodList } from "./composables/useFoodList";
import { useFood } from "./composables/useFood";
import { useCreateFoodMutation } from "./composables/useCreateFoodMutation";
import { useUpdateFoodMutation } from "./composables/useUpdateFoodMutation";
import Error from "@/components/Error.vue";
import FoodModal from "./components/FoodModal.vue";
import FoodFilterBar from "./components/FoodFilterBar.vue";
import FoodDataTable from "./components/FoodDataTable.vue";

const { params, updateParams } = useQueryParams();

const page = params.value.page ? Number(params.value.page) : 1;
const q = params.value.q || "";
const categoryId = params.value.categoryId || "";
const isActive = params.value.isActive || "";

const openModal = ref(false);
const modalMode = ref(FORM_MODE.ADD);
const errorMessage = ref("");

const filter = reactive({
  page: page,
  q: q,
  isActive: isActive,
  categoryId: categoryId,
  limit: TABLE_LIMIT,
});

const tableData = reactive({
  data: [],
  paging: null,
});

const targetFood = reactive({});

const { data: categoriesData, loading: categoriesLoading } =
  useShowcaseCategory();
const { data, loading, error, refetch } = useFoodList(filter);
const { loading: foodLoading, fetch: fetchDetail } = useFood();
const { create, loading: createLoading } = useCreateFoodMutation();
const { update, loading: updateLoading } = useUpdateFoodMutation();

const CATEGORY_OPTIONS = computed(() => {
  const res = categoriesData.value;

  if (!res?.success) return [];

  const options = res?.data?.data?.map((cate) => ({
    title: cate.name,
    value: cate.id,
    imageUrl: cate.imageUrl,
  }));

  return [{ title: "All", value: "" }, ...options];
});

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
  updateParams({
    q: payload.q,
    categoryId: payload.categoryId,
    isActive: payload.isActive,
  });

  filter.page = 1;
  filter.q = payload.q;
  filter.categoryId = payload.categoryId;
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
  const food = res.data.data;

  if (food) {
    Object.assign(targetFood, food);
    modalMode.value = FORM_MODE.VIEW;
    openModal.value = true;
  }
};

const editItem = (item) => {
  console.log("edit", item);
  Object.assign(targetFood, item);
  modalMode.value = FORM_MODE.EDIT;
  openModal.value = true;
};

const handleCloseModal = () => {
  openModal.value = false;

  setTimeout(() => {
    modalMode.value = FORM_MODE.ADD;

    Object.keys(targetFood).forEach((key) => {
      delete targetFood[key];
    });
  }, 500);
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
        id: targetFood.id,
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
    <FoodModal
      :mode="modalMode"
      :open="openModal"
      :food="targetFood"
      :loading="createLoading || updateLoading || foodLoading"
      :CATEGORY_OPTIONS="CATEGORY_OPTIONS"
      :categoriesLoading="categoriesLoading"
      @submit="handleSubmit"
      @close="handleCloseModal"
    />

    <FoodFilterBar
      :filter="filter"
      :CATEGORY_OPTIONS="CATEGORY_OPTIONS"
      :categoriesLoading="categoriesLoading"
      @search="handleSubmitSearch"
      @create="openModal = true"
    />

    <Error v-if="!loading && error" :content="errorMessage" />

    <FoodDataTable
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
