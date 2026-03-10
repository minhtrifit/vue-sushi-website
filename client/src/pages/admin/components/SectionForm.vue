<script setup>
import { get } from "lodash";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { PhPaperPlaneTilt } from "@phosphor-icons/vue";

const props = defineProps({
  title: {
    type: String,
    default: "Section Form Management",
  },
  defaultValue: {
    type: Object,
    default: () => ({
      mainTitle: "",
      subTitle: "",
      content: "",
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit-section"]);

const router = useRouter();

const FormSchema = z.object({
  mainTitle: z.string().min(1, "Main title is required"),
  subTitle: z.string().min(1, "Sub title is required"),
  content: z.string().min(1, "Content is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: props.defaultValue,
});

const { value: mainTitle, errorMessage: mainTitleError } =
  useField("mainTitle");
const { value: subTitle, errorMessage: subTitleError } = useField("subTitle");
const { value: content, errorMessage: contentError } = useField("content");

const onBack = () => {
  router.back();
};

const onSubmit = handleSubmit((values) => {
  emit("submit-section", {
    value: values,
    resetFn: resetForm,
  });
});
</script>

<template>
  <v-label class="mb-5">{{ get(props, "title") }}</v-label>

  <form @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
          v-model="mainTitle"
          label="Main title"
          rows="2"
          auto-grow
          :error-messages="mainTitleError"
          class="mb-4"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea
          v-model="subTitle"
          label="Sub title"
          rows="2"
          auto-grow
          :error-messages="subTitleError"
          class="mb-4"
        />
      </v-col>
    </v-row>

    <v-textarea
      v-model="content"
      label="Content"
      rows="4"
      auto-grow
      :error-messages="contentError"
      class="mb-6"
    />

    <v-sheet class="d-flex justify-end ga-3">
      <v-btn variant="outlined" color="grey" @click="onBack">Cancel</v-btn>

      <v-btn color="primary" type="submit" :loading="props.loading">
        <PhPaperPlaneTilt size="20" />
        <span class="ml-2">Save</span>
      </v-btn>
    </v-sheet>
  </form>
</template>
