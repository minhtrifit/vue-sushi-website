<script setup>
import { get } from "lodash";
import { watch } from "vue";
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { FORM_MODE } from "@/constants";
import { capitalizeFirstLetter, generateSku } from "@/helpers/index";
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
  food: {
    type: Object,
    default: () => ({
      name: "",
      imageUrl: "",
      isActive: true,
    }),
  },
  CATEGORY_OPTIONS: {
    type: Array,
    default: [],
  },
  categoriesLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "submit"]);

const FormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    categoryId: z.string().nullable(),
    sku: z.string().min(1, "SKU is required"),
    price: z.number().nullable(),
    stock: z.number().nullable(),
    imageUrl: z.string().min(1, "Image is required"),
    isActive: z.boolean(),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.categoryId === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Category is required",
        path: ["categoryId"],
      });
    }

    if (data.price === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price is required",
        path: ["price"],
      });
    } else if (data.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price is greater than 0",
        path: ["price"],
      });
    }

    if (data.stock === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Stock is required",
        path: ["stock"],
      });
    } else if (data.stock <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Stock is greater than 0",
        path: ["stock"],
      });
    }
  });

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: toTypedSchema(FormSchema),
  initialValues: {
    name: "",
    categoryId: null,
    sku: "",
    price: null,
    stock: null,
    imageUrl: "",
    isActive: true,
    description: "",
  },
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: categoryId, errorMessage: categoryIdError } =
  useField("categoryId");
const {
  value: sku,
  setValue: setSkuValue,
  errorMessage: skuError,
} = useField("sku");
const { value: price, errorMessage: priceError } = useField("price");
const { value: stock, errorMessage: stockError } = useField("stock");
const { value: imageUrl, errorMessage: imageUrlError } = useField("imageUrl");
const { value: isActive, errorMessage: isActiveError } = useField("isActive");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// Set form value handle
watch(
  () => props.open,
  (val) => {
    if (!val) return;

    resetForm({
      values: {
        name: props.food?.name || "",
        categoryId: props.food?.categoryId || null,
        sku: props.food?.sku || "",
        price: props.food?.price || null,
        stock: props.food?.stock || null,
        imageUrl: props.food?.imageUrl || "",
        isActive: props.food?.isActive ?? true,
        description: props.food?.description || "",
      },
    });
  },
  { immediate: true },
);

const handleResetForm = () => {
  resetForm({
    values: {
      name: "",
      categoryId: null,
      sku: "",
      price: null,
      stock: null,
      imageUrl: "",
      isActive: true,
      description: "",
    },
  });
};

const handleGetSku = () => {
  const sku = generateSku();
  setSkuValue(sku);
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
    max-width="800"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6">
        {{ capitalizeFirstLetter(get(props, "mode").toLowerCase()) }} Food
      </v-card-title>

      <v-card-text class="d-flex flex-column ga-3">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="props.mode === FORM_MODE.VIEW"
              v-model="name"
              :error-messages="nameError"
              label="Name"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :disabled="props.categoriesLoading"
              v-model="categoryId"
              :items="props.CATEGORY_OPTIONS.filter((c) => c.value !== '')"
              :error-messages="categoryIdError"
              label="Category"
              item-title="title"
              item-value="value"
              variant="outlined"
            >
              <template #item="{ props, item }">
                <v-list-item v-bind="props" :title="undefined">
                  <template #prepend>
                    <v-img
                      :src="item.imageUrl"
                      width="30"
                      height="30"
                      cover
                      class="rounded"
                    />
                  </template>

                  <v-list-item-title style="margin-left: 20px">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="props.mode === FORM_MODE.VIEW"
              v-model="sku"
              :error-messages="skuError"
              label="SKU"
              variant="outlined"
            >
              <template #append-inner>
                <v-btn
                  size="small"
                  icon="mdi-refresh"
                  variant="text"
                  @click="handleGetSku"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
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
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              type="number"
              :disabled="props.mode === FORM_MODE.VIEW"
              v-model.number="price"
              :error-messages="priceError"
              label="Price"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="number"
              :disabled="props.mode === FORM_MODE.VIEW"
              v-model.number="stock"
              :error-messages="stockError"
              label="Stock"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <Upload
          :isView="props.mode === FORM_MODE.VIEW ? true : false"
          mode="single"
          :url="imageUrl"
          @uploaded="(url) => setFieldValue('imageUrl', url)"
        />

        <div v-if="imageUrlError" class="text-error text-caption">
          {{ imageUrlError }}
        </div>

        <v-textarea
          :disabled="props.mode === FORM_MODE.VIEW"
          v-model="description"
          :error-messages="descriptionError"
          label="Description"
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
