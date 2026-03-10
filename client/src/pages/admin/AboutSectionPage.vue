<script setup>
import { reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { SECTION_TYPE } from "@/constants";
import { formatErrorMessage } from "@/helpers";
import { useSectionByType } from "@/composables/useSectionByType";
import { useUpdateSectionMutation } from "./composables/useUpdateSectionMutation";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import SectionForm from "./components/SectionForm.vue";

const { data, loading, error } = useSectionByType(SECTION_TYPE.ABOUT);
const { update, loading: updateLoading } = useUpdateSectionMutation();

const formInitValue = reactive({
  id: "",
  mainTitle: "",
  subTitle: "",
  content: "",
});
const errorMessage = ref("");

const handleSubmitSection = async (payload) => {
  const { value } = payload;

  update(
    {
      id: formInitValue.id,
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
      },
      onError: (data) => {
        console.log("error:", data);
      },
    },
  );
};

watch(
  data,
  (res) => {
    if (!res?.success) return;

    Object.assign(formInitValue, res.data);
  },
  { immediate: true },
);

watch(error, (err) => {
  console.log("ERROR:", err?.response?.data);
  errorMessage.value = formatErrorMessage(err?.response?.data?.message) || null;
});
</script>

<template>
  <Loading v-if="loading" />

  <Error v-if="!loading && error" :content="errorMessage" />

  <v-card v-if="!loading && !error">
    <v-card-text>
      <SectionForm
        title="About Section Management"
        :defaultValue="formInitValue"
        :loading="updateLoading"
        @submit-section="handleSubmitSection"
      />
    </v-card-text>
  </v-card>
</template>
