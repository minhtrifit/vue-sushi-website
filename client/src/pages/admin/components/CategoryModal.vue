<script setup>
import { get } from "lodash";
import { watch } from "vue";
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { FORM_MODE } from "@/constants";
import { capitalizeFirstLetter } from "@/helpers/index";
import Upload from "@/components/Upload.vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: FORM_MODE.ADD,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  modelValue: Boolean,
  category: {
    type: Object,
    default: () => ({
      name: "",
      imageUrl: "",
      isActive: true,
    }),
  },
});

const emit = defineEmits(["close", "submit"]);

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().min(1, "Image is required"),
  isActive: z.boolean(),
});

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    name: "",
    imageUrl: "",
    isActive: true,
  },
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: imageUrl, errorMessage: imageUrlError } = useField("imageUrl");
const { value: isActive, errorMessage: isActiveError } = useField("isActive");

// Set form value handle
watch(
  () => props.open,
  (val) => {
    if (!val) return;

    resetForm({
      values: {
        name: props.category?.name || "",
        imageUrl: props.category?.imageUrl || "",
        isActive: props.category?.isActive ?? true,
      },
    });
  },
  { immediate: true },
);

const handleResetForm = () => {
  resetForm({
    values: {
      name: "",
      imageUrl: "",
      isActive: true,
    },
  });
};

const close = () => {
  emit("close");
  handleResetForm();
};

const onSubmit = handleSubmit((values) => {
  emit("submit", {
    value: values,
    mode: props.mode,
    resetFn: handleResetForm,
    close: close,
  });
});
</script>

<template>
  <v-dialog
    :model-value="props.open"
    max-width="500"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6">
        {{ capitalizeFirstLetter(get(props, "mode").toLowerCase()) }} Category
      </v-card-title>

      <v-card-text class="d-flex flex-column ga-8">
        <v-text-field
          :disabled="props.mode === FORM_MODE.VIEW"
          v-model="name"
          :error-messages="nameError"
          label="Name"
          variant="outlined"
        />

        <Upload
          :isView="props.mode === FORM_MODE.VIEW ? true : false"
          mode="single"
          :url="imageUrl"
          @uploaded="(url) => setFieldValue('imageUrl', url)"
        />

        <div v-if="imageUrlError" class="text-error text-caption">
          {{ imageUrlError }}
        </div>

        <v-select
          :disabled="props.mode === FORM_MODE.VIEW"
          v-model="isActive"
          :items="[
            { title: 'Active', value: true },
            { title: 'Inactive', value: false },
          ]"
          :error-messages="isActiveError"
          label="Status"
          item-title="title"
          item-value="value"
          variant="outlined"
        />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="close">Cancel</v-btn>
        <v-btn
          v-if="props.mode !== FORM_MODE.VIEW"
          color="primary"
          @click="onSubmit"
          :loading="props.loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
